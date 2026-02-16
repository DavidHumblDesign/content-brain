import { useState, useMemo } from "react";

const CONTENT_TYPES = [
  { id: "glossary", label: "Glossary", icon: "📖" },
  { id: "guide", label: "Guide", icon: "📐" },
  { id: "thought", label: "Thought", icon: "💭" },
  { id: "tool", label: "Tool", icon: "🔧" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "twitter", label: "Twitter", icon: "🐦" },
  { id: "carousel", label: "Carousel", icon: "🎠" },
  { id: "newsletter", label: "Newsletter", icon: "📧" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  // Monday = 0, Sunday = 6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;
  return { daysInMonth, startDow };
}

function fmtMonth(year, month) {
  return new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function dateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Calendar({ calendarEntries, setCalendarEntries, backlog, setBacklog, pillars, setActive }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterPillar, setFilterPillar] = useState("all");
  const [addingToDate, setAddingToDate] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);

  const getPillar = (id) => (pillars || []).find(p => p.id === id);
  const getType = (id) => CONTENT_TYPES.find(t => t.id === id) || CONTENT_TYPES[0];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const { daysInMonth, startDow } = getMonthData(viewYear, viewMonth);

  const entries = useMemo(() => {
    let items = [...(calendarEntries || [])];
    if (filterType !== "all") items = items.filter(e => e.type === filterType);
    if (filterPillar !== "all") items = items.filter(e => String(e.pillarId) === filterPillar);
    return items;
  }, [calendarEntries, filterType, filterPillar]);

  const entriesByDate = useMemo(() => {
    const map = {};
    entries.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [entries]);

  const monthStats = useMemo(() => {
    const monthEntries = entries.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    });
    const byType = {};
    monthEntries.forEach(e => { byType[e.type] = (byType[e.type] || 0) + 1; });
    return { total: monthEntries.length, byType };
  }, [entries, viewYear, viewMonth]);

  const removeEntry = (id) => {
    setCalendarEntries(prev => (prev || []).filter(e => e.id !== id));
    setSelectedDate(null);
  };

  const updateEntry = (id, updates) => {
    setCalendarEntries(prev => (prev || []).map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const addFromBacklog = (backlogItem, date) => {
    const entry = {
      id: Date.now(), backlogId: backlogItem.id, date,
      title: backlogItem.title, type: backlogItem.type,
      pillarId: backlogItem.pillarId, platform: backlogItem.platform || "blog",
      status: backlogItem.status === "published" ? "published" : backlogItem.status === "drafting" ? "drafting" : "planned",
    };
    setCalendarEntries(prev => [...(prev || []), entry]);
    if (!backlogItem.targetDate) {
      setBacklog(prev => (prev || []).map(b => b.id === backlogItem.id ? { ...b, targetDate: date, updatedAt: new Date().toISOString() } : b));
    }
    setAddingToDate(null);
  };

  const addNewToDate = (date) => {
    const entry = {
      id: Date.now(), backlogId: null, date,
      title: "New content", type: "guide",
      pillarId: null, platform: "blog", status: "planned",
    };
    setCalendarEntries(prev => [...(prev || []), entry]);
    setEditingEntry(entry.id);
    setAddingToDate(null);
  };

  const generateMonthPrompt = () => {
    const pillarInfo = (pillars || []).map(p => `- ${p.name}: ${(p.topics || []).join(", ")}`).join("\n");
    const existingItems = entries.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    }).map(e => `- ${e.date}: ${e.title} (${e.type})`).join("\n");
    const backlogIdeas = (backlog || []).filter(b => b.status === "idea" || b.status === "planned").slice(0, 10).map(b => `- ${b.title} (${b.type}, priority: ${b.priority})`).join("\n");

    const prompt = `You are a content strategist for Humbl Design (humbldesign.io), a design studio for tech startups run by David Pokorny.

Plan a full content calendar for ${fmtMonth(viewYear, viewMonth)}.

CONTENT PILLARS:
${pillarInfo || "No pillars defined yet."}

PREFERRED CADENCE:
- Monday: Humbl Thought / hot take (personal opinion piece)
- Wednesday: Guide excerpt / data insight / LinkedIn post
- Friday: Carousel / story / engagement question

ALREADY SCHEDULED THIS MONTH:
${existingItems || "Nothing scheduled yet."}

BACKLOG IDEAS (high priority first):
${backlogIdeas || "No backlog items yet."}

For each suggested post, include:
1. Date (${fmtMonth(viewYear, viewMonth)}, weekdays only)
2. Title
3. Type (guide / thought / glossary / tool / linkedin / carousel)
4. Which pillar it belongs to
5. A one-line hook idea

Aim for 3 posts per week. Mix pillar coverage evenly. Prioritize backlog items that are marked as planned or high priority.`;

    navigator.clipboard?.writeText(prompt);
    alert("Month plan prompt copied! Paste it into Gemini or Perplexity.");
  };

  const selectSt = { background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "6px 32px 6px 10px", color: "#E8E4E0", fontSize: 12, outline: "none", boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236A6560' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" };
  const inputSt = { width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 12px", color: "#E8E4E0", fontSize: 12, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

  const todayStr = dateStr(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Content Calendar</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>Plan and visualize your content schedule</p>
        </div>
        <button onClick={generateMonthPrompt} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Generate month plan</button>
      </div>

      {/* Month nav + filters */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={prevMonth} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 12px", color: "#8A8580", cursor: "pointer", fontSize: 14 }}>◀</button>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#E8E4E0", minWidth: 200, textAlign: "center" }}>{fmtMonth(viewYear, viewMonth)}</span>
          <button onClick={nextMonth} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 12px", color: "#8A8580", cursor: "pointer", fontSize: 14 }}>▶</button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={selectSt}>
            <option value="all">All types</option>
            {CONTENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
          </select>
          <select value={filterPillar} onChange={e => setFilterPillar(e.target.value)} style={selectSt}>
            <option value="all">All pillars</option>
            {(pillars || []).map(p => <option key={p.id} value={String(p.id)}>{p.name}</option>)}
          </select>
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", overflow: "hidden" }}>
        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #3A3632" }}>
          {DAYS.map(d => (
            <div key={d} style={{ padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 600, color: "#6A6560", textTransform: "uppercase" }}>{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {/* Empty cells before month start */}
          {Array.from({ length: startDow }, (_, i) => (
            <div key={`empty-${i}`} style={{ minHeight: 90, borderRight: "1px solid #3A363240", borderBottom: "1px solid #3A363240", background: "#242220" }} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const ds = dateStr(viewYear, viewMonth, day);
            const dayEntries = entriesByDate[ds] || [];
            const isToday = ds === todayStr;
            const isSelected = selectedDate === ds;
            const isWeekend = ((startDow + i) % 7) >= 5;

            return (
              <div
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : ds)}
                style={{
                  minHeight: 90, padding: "4px 6px", borderRight: "1px solid #3A363240", borderBottom: "1px solid #3A363240",
                  background: isSelected ? "#1A1816" : isWeekend ? "#242220" : "transparent",
                  cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "#1E1C1A"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isWeekend ? "#242220" : "transparent"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <span style={{
                    fontSize: 12, fontWeight: isToday ? 700 : 400,
                    color: isToday ? "#C5FF4A" : "#8A8580",
                    background: isToday ? "rgba(197,255,74,0.15)" : "transparent",
                    borderRadius: 4, padding: isToday ? "1px 5px" : 0,
                  }}>{day}</span>
                  {isSelected && (
                    <button onClick={(e) => { e.stopPropagation(); setAddingToDate(ds); }} style={{ background: "none", border: "none", color: "#C5FF4A", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>+</button>
                  )}
                </div>
                {dayEntries.slice(0, 3).map(entry => {
                  const pillar = getPillar(entry.pillarId);
                  const type = getType(entry.type);
                  return (
                    <div key={entry.id} style={{
                      fontSize: 10, padding: "2px 4px", marginBottom: 2, borderRadius: 3,
                      background: pillar ? `${pillar.color}18` : "#3A363240",
                      color: pillar ? pillar.color : "#8A8580",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      borderLeft: `2px solid ${pillar ? pillar.color : "#6A6560"}`,
                    }}>
                      {entry.title || type.label}
                    </div>
                  );
                })}
                {dayEntries.length > 3 && <div style={{ fontSize: 9, color: "#6A6560" }}>+{dayEntries.length - 3}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected date detail panel */}
      {selectedDate && (
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 16, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E4E0" }}>
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <button onClick={() => setAddingToDate(selectedDate)} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 6, padding: "5px 12px", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>+ Add</button>
          </div>

          {(entriesByDate[selectedDate] || []).length === 0 && (
            <div style={{ fontSize: 13, color: "#6A6560", padding: "12px 0" }}>Nothing scheduled for this day.</div>
          )}

          {(entriesByDate[selectedDate] || []).map(entry => {
            const pillar = getPillar(entry.pillarId);
            const type = getType(entry.type);
            const isEditing = editingEntry === entry.id;

            if (isEditing) {
              return (
                <div key={entry.id} style={{ background: "#1A1816", borderRadius: 8, padding: 12, marginBottom: 8, border: "1px solid #3A3632" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input value={entry.title} onChange={e => updateEntry(entry.id, { title: e.target.value })} style={inputSt} placeholder="Title..." />
                    <div style={{ display: "flex", gap: 8 }}>
                      <select value={entry.type} onChange={e => updateEntry(entry.id, { type: e.target.value })} style={{ ...selectSt, flex: 1 }}>
                        {CONTENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                      </select>
                      <select value={entry.pillarId || ""} onChange={e => updateEntry(entry.id, { pillarId: e.target.value ? Number(e.target.value) : null })} style={{ ...selectSt, flex: 1 }}>
                        <option value="">No pillar</option>
                        {(pillars || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <select value={entry.status} onChange={e => updateEntry(entry.id, { status: e.target.value })} style={{ ...selectSt, flex: 1 }}>
                        <option value="planned">Planned</option>
                        <option value="drafting">Drafting</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <button onClick={() => setEditingEntry(null)} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 600, fontSize: 11, cursor: "pointer", alignSelf: "flex-start" }}>Done</button>
                  </div>
                </div>
              );
            }

            return (
              <div key={entry.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#1A1816", borderRadius: 8, marginBottom: 4, border: "1px solid #3A363260" }}>
                {pillar && <div style={{ width: 8, height: 8, borderRadius: "50%", background: pillar.color, flexShrink: 0 }} />}
                <span style={{ flex: 1, fontSize: 13, color: "#E8E4E0" }}>{entry.title || "Untitled"}</span>
                <span style={{ fontSize: 10, color: "#8A8580", padding: "2px 6px", background: "#2A2724", borderRadius: 10 }}>{type.label}</span>
                <span style={{ fontSize: 10, color: entry.status === "published" ? "#34D399" : entry.status === "drafting" ? "#F59E0B" : "#6A6560" }}>{entry.status}</span>
                <button onClick={() => setEditingEntry(entry.id)} style={{ background: "none", border: "none", color: "#6A6560", cursor: "pointer", fontSize: 11, padding: "2px 6px" }}>✏️</button>
                <button onClick={() => removeEntry(entry.id)} style={{ background: "none", border: "none", color: "#F8717180", cursor: "pointer", fontSize: 11, padding: "2px 6px" }}>×</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add to date modal */}
      {addingToDate && (
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #C5FF4A40", padding: 16, marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E4E0", marginBottom: 12 }}>
            Add to {new Date(addingToDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>

          {/* From backlog */}
          {(backlog || []).filter(b => b.status !== "published").length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#6A6560", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>From backlog</div>
              <div style={{ maxHeight: 160, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
                {(backlog || []).filter(b => b.status !== "published").slice(0, 15).map(b => {
                  const pillar = getPillar(b.pillarId);
                  return (
                    <button key={b.id} onClick={() => addFromBacklog(b, addingToDate)} style={{
                      background: "#1A1816", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 10px",
                      color: "#E8E4E0", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {pillar && <div style={{ width: 6, height: 6, borderRadius: "50%", background: pillar.color }} />}
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</span>
                      <span style={{ fontSize: 10, color: "#6A6560" }}>{b.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => addNewToDate(addingToDate)} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 14px", color: "#8A8580", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>+ Create new</button>
            <button onClick={() => setAddingToDate(null)} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Legend + stats */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, padding: "12px 16px", background: "#2A2724", borderRadius: 10, border: "1px solid #3A3632" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {(pillars || []).map(p => (
            <span key={p.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: p.color }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} /> {p.name}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#6A6560" }}>
          This month: {monthStats.total} items
          {Object.entries(monthStats.byType).map(([type, count]) => {
            const t = getType(type);
            return <span key={type}> · {count} {t.label.toLowerCase()}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
