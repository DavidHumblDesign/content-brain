import { useMemo } from "react";

const STATUSES = [
  { id: "idea", label: "Ideas", icon: "💡", color: "#6A6560" },
  { id: "planned", label: "Planned", icon: "📋", color: "#60A5FA" },
  { id: "drafting", label: "Drafting", icon: "✏️", color: "#F59E0B" },
  { id: "review", label: "Review", icon: "👀", color: "#A78BFA" },
  { id: "published", label: "Published", icon: "✅", color: "#34D399" },
];

const CONTENT_TYPES = [
  { id: "glossary", label: "Glossary" }, { id: "guide", label: "Guide" },
  { id: "thought", label: "Thought" }, { id: "tool", label: "Tool" },
  { id: "linkedin", label: "LinkedIn" }, { id: "twitter", label: "Twitter" },
  { id: "carousel", label: "Carousel" }, { id: "newsletter", label: "Newsletter" },
];

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysFromNow(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return Math.round((d - now) / (1000 * 60 * 60 * 24));
}

export default function Dashboard({ backlog, calendarEntries, pillars, setActive }) {
  const getPillar = (id) => (pillars || []).find(p => p.id === id);
  const getType = (id) => CONTENT_TYPES.find(t => t.id === id) || { label: id };

  // What's Next — upcoming 3 calendar items
  const upcoming = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return [...(calendarEntries || [])]
      .filter(e => e.date >= today && e.status !== "published")
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  }, [calendarEntries]);

  // Pipeline stats
  const pipeline = useMemo(() => {
    const counts = {};
    STATUSES.forEach(s => { counts[s.id] = 0; });
    (backlog || []).forEach(b => { counts[b.status] = (counts[b.status] || 0) + 1; });
    const total = (backlog || []).length;
    const max = Math.max(1, ...Object.values(counts));
    return { counts, total, max };
  }, [backlog]);

  // Month stats
  const monthStats = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthEntries = (calendarEntries || []).filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    return {
      planned: monthEntries.filter(e => e.status === "planned").length,
      drafting: monthEntries.filter(e => e.status === "drafting").length,
      published: monthEntries.filter(e => e.status === "published").length,
    };
  }, [calendarEntries]);

  // Activity feed — derived from backlog timestamps
  const activityFeed = useMemo(() => {
    const events = [];
    (backlog || []).forEach(b => {
      if (b.status === "published" && b.publishedDate) {
        events.push({ date: b.publishedDate, icon: "✅", text: `Published "${b.title}"`, type: b.type, pillarId: b.pillarId });
      }
      if (b.status === "drafting") {
        events.push({ date: b.updatedAt?.split("T")[0] || b.createdAt?.split("T")[0], icon: "✏️", text: `Started drafting "${b.title}"`, type: b.type, pillarId: b.pillarId });
      }
      if (b.status === "idea") {
        events.push({ date: b.createdAt?.split("T")[0], icon: "💡", text: `Added "${b.title}" to backlog`, type: b.type, pillarId: b.pillarId });
      }
      if (b.status === "planned" && b.targetDate) {
        events.push({ date: b.updatedAt?.split("T")[0] || b.createdAt?.split("T")[0], icon: "📅", text: `Scheduled "${b.title}" for ${fmtDate(b.targetDate)}`, type: b.type, pillarId: b.pillarId });
      }
    });
    events.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return events.slice(0, 12);
  }, [backlog]);

  const todayStr = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Welcome back, David.</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>{todayStr}</p>
      </div>

      {/* What's Next */}
      <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>What's Next</div>
        {upcoming.length === 0 && (
          <div style={{ fontSize: 13, color: "#6A6560", padding: "8px 0" }}>Nothing scheduled — <button onClick={() => setActive("calendar")} style={{ background: "none", border: "none", color: "#C5FF4A", cursor: "pointer", fontFamily: "inherit", fontSize: 13, padding: 0 }}>add to calendar</button></div>
        )}
        {upcoming.map(entry => {
          const pillar = getPillar(entry.pillarId);
          const type = getType(entry.type);
          const days = daysFromNow(entry.date);
          const dayLabel = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${fmtDate(entry.date)}`;

          return (
            <div key={entry.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, marginBottom: 6, background: days === 0 ? "rgba(197,255,74,0.06)" : "transparent", border: days === 0 ? "1px solid rgba(197,255,74,0.15)" : "1px solid transparent" }}>
              <span style={{ fontSize: 12, color: days === 0 ? "#C5FF4A" : "#6A6560", fontWeight: 600, minWidth: 70 }}>📅 {dayLabel}</span>
              {pillar && <div style={{ width: 8, height: 8, borderRadius: "50%", background: pillar.color, flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: "#E8E4E0", fontWeight: 500 }}>{entry.title}</span>
                <span style={{ fontSize: 11, color: "#6A6560", marginLeft: 8 }}>{type.label}</span>
              </div>
              <span style={{ fontSize: 10, color: entry.status === "drafting" ? "#F59E0B" : "#6A6560" }}>{entry.status}</span>
              <button onClick={() => setActive("generator")} style={{ background: "#C5FF4A20", border: "1px solid #C5FF4A40", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#C5FF4A", cursor: "pointer", fontFamily: "inherit" }}>Write it</button>
            </div>
          );
        })}
      </div>

      {/* Pipeline + Month stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Pipeline */}
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Pipeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STATUSES.map(s => {
              const count = pipeline.counts[s.id] || 0;
              const pct = pipeline.total > 0 ? (count / pipeline.total) * 100 : 0;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#8A8580", minWidth: 70 }}>{s.icon} {s.label}</span>
                  <div style={{ flex: 1, height: 6, background: "#1A1816", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: s.color, borderRadius: 3, transition: "width 0.4s ease" }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#6A6560", minWidth: 24, textAlign: "right" }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* This Month */}
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>This Month</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#60A5FA" }}>{monthStats.planned}</div>
              <div style={{ fontSize: 11, color: "#6A6560" }}>Planned</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#F59E0B" }}>{monthStats.drafting}</div>
              <div style={{ fontSize: 11, color: "#6A6560" }}>Drafting</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#34D399" }}>{monthStats.published}</div>
              <div style={{ fontSize: 11, color: "#6A6560" }}>Published</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Activity Feed</div>
        {activityFeed.length === 0 && (
          <div style={{ fontSize: 13, color: "#6A6560", padding: "8px 0" }}>No activity yet — start adding content to your backlog.</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {activityFeed.map((event, i) => {
            const pillar = getPillar(event.pillarId);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px", borderRadius: 6 }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{event.icon}</span>
                <span style={{ fontSize: 11, color: "#6A6560", minWidth: 55, flexShrink: 0 }}>{fmtDate(event.date)}</span>
                {pillar && <div style={{ width: 6, height: 6, borderRadius: "50%", background: pillar.color, flexShrink: 0 }} />}
                <span style={{ fontSize: 12, color: "#C0BCB8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{event.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions + Pillars at a Glance */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Quick Actions */}
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Quick Actions</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => setActive("backlog")} style={{ background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 14px", color: "#E8E4E0", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>+ New to backlog</button>
            <button onClick={() => setActive("generator")} style={{ background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 14px", color: "#E8E4E0", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Build prompt</button>
            <button onClick={() => setActive("calendar")} style={{ background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 14px", color: "#E8E4E0", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View calendar</button>
          </div>
        </div>

        {/* Pillars at a Glance */}
        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Pillars</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(pillars || []).map(p => {
              const published = (backlog || []).filter(b => b.pillarId === p.id && b.status === "published").length;
              const inBacklog = (backlog || []).filter(b => b.pillarId === p.id && b.status !== "published").length;
              return (
                <span key={p.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: p.color }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />
                  {p.name.split(" ")[0]} ({published} pub / {inBacklog} backlog)
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
