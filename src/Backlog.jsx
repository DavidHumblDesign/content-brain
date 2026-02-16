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

const STATUSES = [
  { id: "idea", label: "Idea", icon: "💡", color: "#6A6560" },
  { id: "planned", label: "Planned", icon: "📋", color: "#60A5FA" },
  { id: "drafting", label: "Drafting", icon: "✏️", color: "#F59E0B" },
  { id: "review", label: "Review", icon: "👀", color: "#A78BFA" },
  { id: "published", label: "Published", icon: "✅", color: "#34D399" },
];

const PRIORITIES = [
  { id: "high", label: "High", color: "#F87171", icon: "⬆" },
  { id: "medium", label: "Medium", color: "#F59E0B", icon: "●" },
  { id: "low", label: "Low", color: "#60A5FA", icon: "○" },
];

const PLATFORMS = ["blog", "linkedin", "twitter", "newsletter"];

function makeEmptyItem() {
  const now = new Date().toISOString();
  return {
    id: Date.now(),
    title: "", type: "guide", pillarId: null, status: "idea", priority: "medium",
    summary: "", hook: "", keyPoints: "", notes: "",
    seoTitle: "", seoDescription: "", targetKeywords: "", slug: "",
    platform: "blog", targetDate: null, publishedDate: null, publishedUrl: "",
    estimatedWords: null, readingTime: null, relatedPosts: "",
    toolEmbed: false, toolName: "",
    createdAt: now, updatedAt: now,
  };
}

export default function Backlog({ backlog, setBacklog, pillars, calendarEntries, setCalendarEntries, setActive }) {
  const [view, setView] = useState("list"); // list | detail
  const [detailId, setDetailId] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterPillar, setFilterPillar] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [groupBy, setGroupBy] = useState("status");
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("guide");
  const [newPillar, setNewPillar] = useState("none");

  const getPillar = (id) => (pillars || []).find(p => p.id === id);
  const getType = (id) => CONTENT_TYPES.find(t => t.id === id) || CONTENT_TYPES[0];
  const getStatus = (id) => STATUSES.find(s => s.id === id) || STATUSES[0];
  const getPriority = (id) => PRIORITIES.find(p => p.id === id) || PRIORITIES[1];

  const filtered = useMemo(() => {
    let items = [...(backlog || [])];
    if (filterType !== "all") items = items.filter(b => b.type === filterType);
    if (filterPillar !== "all") items = items.filter(b => String(b.pillarId) === filterPillar);
    if (filterStatus !== "all") items = items.filter(b => b.status === filterStatus);
    if (filterPriority !== "all") items = items.filter(b => b.priority === filterPriority);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(b => (b.title || "").toLowerCase().includes(q) || (b.summary || "").toLowerCase().includes(q) || (b.targetKeywords || "").toLowerCase().includes(q));
    }
    // Sort
    items.sort((a, b) => {
      if (sortBy === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
      if (sortBy === "created") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "priority") { const ord = { high: 0, medium: 1, low: 2 }; return (ord[a.priority] || 1) - (ord[b.priority] || 1); }
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      return 0;
    });
    return items;
  }, [backlog, filterType, filterPillar, filterStatus, filterPriority, search, sortBy]);

  const grouped = useMemo(() => {
    if (groupBy === "none") return [{ label: `All (${filtered.length})`, items: filtered }];
    const groups = {};
    const order = groupBy === "status" ? STATUSES.map(s => s.id) : groupBy === "type" ? CONTENT_TYPES.map(t => t.id) : (pillars || []).map(p => String(p.id));
    filtered.forEach(item => {
      let key;
      if (groupBy === "status") key = item.status;
      else if (groupBy === "type") key = item.type;
      else if (groupBy === "pillar") key = item.pillarId ? String(item.pillarId) : "none";
      else key = "all";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    const result = [];
    order.forEach(k => {
      if (groups[k]?.length) {
        let label;
        if (groupBy === "status") { const s = getStatus(k); label = `${s.icon} ${s.label} (${groups[k].length})`; }
        else if (groupBy === "type") { const t = getType(k); label = `${t.icon} ${t.label} (${groups[k].length})`; }
        else if (groupBy === "pillar") { const p = getPillar(Number(k)); label = p ? `${p.name} (${groups[k].length})` : `Unassigned (${groups[k].length})`; }
        result.push({ label, items: groups[k], key: k });
      }
    });
    if (groupBy === "pillar" && groups["none"]?.length) {
      result.push({ label: `Unassigned (${groups["none"].length})`, items: groups["none"], key: "none" });
    }
    return result;
  }, [filtered, groupBy, pillars]);

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item = { ...makeEmptyItem(), title: newTitle.trim(), type: newType, pillarId: newPillar === "none" ? null : Number(newPillar) };
    setBacklog(prev => [item, ...(prev || [])]);
    setNewTitle(""); setNewType("guide"); setNewPillar("none"); setAdding(false);
  };

  const updateItem = (id, updates) => {
    setBacklog(prev => (prev || []).map(b => b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b));
  };

  const deleteItem = (id) => {
    if (window.confirm("Delete this content item?")) {
      setBacklog(prev => (prev || []).filter(b => b.id !== id));
      if (detailId === id) { setDetailId(null); setView("list"); }
    }
  };

  const openDetail = (id) => { setDetailId(id); setView("detail"); };
  const closeDetail = () => { setDetailId(null); setView("list"); };

  const addToCalendar = (item) => {
    const date = item.targetDate || new Date().toISOString().split("T")[0];
    const entry = {
      id: Date.now(), backlogId: item.id, date,
      title: item.title, type: item.type,
      pillarId: item.pillarId, platform: item.platform || "blog",
      status: item.status === "published" ? "published" : item.status === "drafting" ? "drafting" : "planned",
    };
    setCalendarEntries(prev => [...(prev || []), entry]);
    if (!item.targetDate) updateItem(item.id, { targetDate: date });
  };

  const writeIt = (item) => {
    // Navigate to Prompt Maker
    setActive("generator");
  };

  const inputSt = { width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  const selectSt = { ...inputSt, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236A6560' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 };

  // ── DETAIL VIEW ──
  if (view === "detail" && detailId) {
    const item = (backlog || []).find(b => b.id === detailId);
    if (!item) { closeDetail(); return null; }
    const pillar = getPillar(item.pillarId);
    const type = getType(item.type);
    const status = getStatus(item.status);
    const priority = getPriority(item.priority);
    const readTime = item.estimatedWords ? Math.ceil(item.estimatedWords / 250) : null;

    const upd = (field, value) => updateItem(item.id, { [field]: value });

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <button onClick={closeDetail} style={{ background: "none", border: "none", color: "#8A8580", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to list
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "1px solid #F8717130", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#F87171", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
          </div>
        </div>

        <div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #3A3632", padding: 24 }}>
          {/* Title */}
          <input value={item.title} onChange={e => upd("title", e.target.value)} placeholder="Content title..." style={{ ...inputSt, fontSize: 18, fontWeight: 600, marginBottom: 16 }} />

          {/* Type / Status / Pillar / Priority row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Type</label>
              <select value={item.type} onChange={e => upd("type", e.target.value)} style={selectSt}>
                {CONTENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Status</label>
              <select value={item.status} onChange={e => upd("status", e.target.value)} style={selectSt}>
                {STATUSES.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Pillar</label>
              <select value={item.pillarId || ""} onChange={e => upd("pillarId", e.target.value ? Number(e.target.value) : null)} style={selectSt}>
                <option value="">None</option>
                {(pillars || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Priority</label>
              <select value={item.priority} onChange={e => upd("priority", e.target.value)} style={selectSt}>
                {PRIORITIES.map(p => <option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
              </select>
            </div>
          </div>

          {/* Content section */}
          <div style={{ borderTop: "1px solid #3A3632", paddingTop: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Content</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Summary</label>
                <textarea value={item.summary || ""} onChange={e => upd("summary", e.target.value)} placeholder="150-200 char description..." rows={2} style={{ ...inputSt, resize: "vertical" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Hook</label>
                <input value={item.hook || ""} onChange={e => upd("hook", e.target.value)} placeholder="Opening line / hook idea..." style={inputSt} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Key Points</label>
                <textarea value={item.keyPoints || ""} onChange={e => upd("keyPoints", e.target.value)} placeholder="Main points to cover..." rows={3} style={{ ...inputSt, resize: "vertical" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Notes</label>
                <textarea value={item.notes || ""} onChange={e => upd("notes", e.target.value)} placeholder="Rough thoughts, references..." rows={3} style={{ ...inputSt, resize: "vertical" }} />
              </div>
            </div>
          </div>

          {/* SEO section */}
          <div style={{ borderTop: "1px solid #3A3632", paddingTop: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>SEO</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>SEO Title <span style={{ color: "#4A4540" }}>({(item.seoTitle || "").length}/60)</span></label>
                <input value={item.seoTitle || ""} onChange={e => upd("seoTitle", e.target.value)} placeholder="60 chars max..." maxLength={60} style={inputSt} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>SEO Description <span style={{ color: "#4A4540" }}>({(item.seoDescription || "").length}/155)</span></label>
                <textarea value={item.seoDescription || ""} onChange={e => upd("seoDescription", e.target.value)} placeholder="155 chars max..." maxLength={155} rows={2} style={{ ...inputSt, resize: "vertical" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Keywords</label>
                <input value={item.targetKeywords || ""} onChange={e => upd("targetKeywords", e.target.value)} placeholder="comma-separated..." style={inputSt} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Slug</label>
                <input value={item.slug || ""} onChange={e => upd("slug", e.target.value)} placeholder="url-slug-here" style={inputSt} />
              </div>
            </div>
          </div>

          {/* Publishing section */}
          <div style={{ borderTop: "1px solid #3A3632", paddingTop: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Publishing</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Platform</label>
                <select value={item.platform || "blog"} onChange={e => upd("platform", e.target.value)} style={selectSt}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Est. Words</label>
                <input type="number" value={item.estimatedWords || ""} onChange={e => upd("estimatedWords", e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 2000" style={inputSt} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Target Date</label>
                <input type="date" value={item.targetDate || ""} onChange={e => upd("targetDate", e.target.value || null)} style={inputSt} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Reading Time</label>
                <span style={{ fontSize: 13, color: "#8A8580", padding: "10px 0", display: "block" }}>{readTime ? `${readTime} min` : "—"} <span style={{ fontSize: 10, color: "#4A4540" }}>(auto)</span></span>
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Published Date</label>
                <input type="date" value={item.publishedDate || ""} onChange={e => upd("publishedDate", e.target.value || null)} style={inputSt} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Published URL</label>
                <input value={item.publishedUrl || ""} onChange={e => upd("publishedUrl", e.target.value)} placeholder="https://..." style={inputSt} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Related Posts</label>
                <input value={item.relatedPosts || ""} onChange={e => upd("relatedPosts", e.target.value)} placeholder="Titles or slugs, comma-separated" style={inputSt} />
              </div>
            </div>
          </div>

          {/* Tool embed section */}
          <div style={{ borderTop: "1px solid #3A3632", paddingTop: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8580", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Tool Embed</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#E8E4E0" }}>
                <input type="checkbox" checked={item.toolEmbed || false} onChange={e => upd("toolEmbed", e.target.checked)} style={{ accentColor: "#C5FF4A" }} /> Has embedded tool
              </label>
              {item.toolEmbed && (
                <input value={item.toolName || ""} onChange={e => upd("toolName", e.target.value)} placeholder="e.g. Humbl Scale" style={{ ...inputSt, width: 200 }} />
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ borderTop: "1px solid #3A3632", paddingTop: 16, display: "flex", gap: 8 }}>
            <button onClick={() => writeIt(item)} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              Write it → Prompt Maker
            </button>
            <button onClick={() => addToCalendar(item)} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 18px", color: "#8A8580", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Add to Calendar
            </button>
            {item.slug && (
              <button onClick={() => { navigator.clipboard?.writeText(item.slug); }} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 18px", color: "#8A8580", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                Copy slug
              </button>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 10, color: "#4A4540" }}>
          <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Content Backlog</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>{(backlog || []).length} items — your content pipeline</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ New item</button>
      </div>

      {/* Quick add form */}
      {adding && (
        <div style={{ background: "#2A2724", borderRadius: 12, padding: 16, border: "1px solid #3A3632", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Title</label>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addItem(); if (e.key === "Escape") setAdding(false); }} placeholder="Content title..." autoFocus style={inputSt} />
          </div>
          <div style={{ width: 130 }}>
            <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Type</label>
            <select value={newType} onChange={e => setNewType(e.target.value)} style={selectSt}>
              {CONTENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div style={{ width: 160 }}>
            <label style={{ fontSize: 11, color: "#6A6560", display: "block", marginBottom: 4 }}>Pillar</label>
            <select value={newPillar} onChange={e => setNewPillar(e.target.value)} style={selectSt}>
              <option value="none">None</option>
              {(pillars || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <button onClick={addItem} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Add</button>
          <button onClick={() => { setAdding(false); setNewTitle(""); }} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 16px", color: "#8A8580", fontSize: 13, cursor: "pointer" }}>Cancel</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...selectSt, width: "auto", padding: "6px 32px 6px 10px", fontSize: 12 }}>
          <option value="all">All types</option>
          {CONTENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
        </select>
        <select value={filterPillar} onChange={e => setFilterPillar(e.target.value)} style={{ ...selectSt, width: "auto", padding: "6px 32px 6px 10px", fontSize: 12 }}>
          <option value="all">All pillars</option>
          {(pillars || []).map(p => <option key={p.id} value={String(p.id)}>{p.name}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...selectSt, width: "auto", padding: "6px 32px 6px 10px", fontSize: 12 }}>
          <option value="all">All status</option>
          {STATUSES.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ ...selectSt, width: "auto", padding: "6px 32px 6px 10px", fontSize: 12 }}>
          <option value="all">All priority</option>
          {PRIORITIES.map(p => <option key={p.id} value={p.id}>{p.icon} {p.label}</option>)}
        </select>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ ...inputSt, width: 160, padding: "6px 10px", fontSize: 12 }} />
      </div>

      {/* Sort + Group */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, fontSize: 12, color: "#6A6560", alignItems: "center" }}>
        <span>Sort:</span>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...selectSt, width: "auto", padding: "4px 28px 4px 8px", fontSize: 11, background: "#2A2724" }}>
          <option value="updated">Updated</option>
          <option value="created">Created</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
        <span style={{ marginLeft: 8 }}>Group:</span>
        <select value={groupBy} onChange={e => setGroupBy(e.target.value)} style={{ ...selectSt, width: "auto", padding: "4px 28px 4px 8px", fontSize: 11, background: "#2A2724" }}>
          <option value="status">Status</option>
          <option value="pillar">Pillar</option>
          <option value="type">Type</option>
          <option value="none">Flat list</option>
        </select>
      </div>

      {/* Item list */}
      {grouped.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#8A8580", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #3A3632" }}>
            {group.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {group.items.map(item => {
              const type = getType(item.type);
              const status = getStatus(item.status);
              const priority = getPriority(item.priority);
              const pillar = getPillar(item.pillarId);

              return (
                <div key={item.id} onClick={() => openDetail(item.id)} style={{
                  background: "#2A2724", borderRadius: 8, padding: "10px 14px", border: "1px solid #3A3632",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "border-color 0.15s",
                }} onMouseEnter={e => e.currentTarget.style.borderColor = "#4A4642"} onMouseLeave={e => e.currentTarget.style.borderColor = "#3A3632"}>
                  {/* Priority icon */}
                  <span style={{ color: priority.color, fontSize: 12, flexShrink: 0, width: 14, textAlign: "center" }}>{priority.icon}</span>
                  {/* Pillar dot */}
                  {pillar && <div style={{ width: 8, height: 8, borderRadius: "50%", background: pillar.color, flexShrink: 0 }} />}
                  {/* Title */}
                  <span style={{ flex: 1, fontSize: 13, color: "#E8E4E0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.title || <span style={{ color: "#6A6560", fontStyle: "italic" }}>Untitled</span>}
                  </span>
                  {/* Type badge */}
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 12, background: "#1A1816", color: "#8A8580", flexShrink: 0 }}>{type.label}</span>
                  {/* Target date */}
                  {item.targetDate && <span style={{ fontSize: 10, color: "#6A6560", flexShrink: 0 }}>📅 {item.targetDate.slice(5)}</span>}
                  {/* Tool embed indicator */}
                  {item.toolEmbed && <span style={{ fontSize: 10, color: "#6A6560" }}>🔧</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {(backlog || []).length === 0 && (
        <div style={{ background: "#2A2724", borderRadius: 12, padding: "40px 20px", border: "1px solid #3A3632", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 14, color: "#8A8580" }}>No content in your backlog yet</div>
          <div style={{ fontSize: 12, color: "#6A6560", marginTop: 4 }}>Click "+ New item" to start building your content pipeline.</div>
        </div>
      )}

      {filtered.length === 0 && (backlog || []).length > 0 && (
        <div style={{ padding: 20, textAlign: "center", color: "#6A6560", fontSize: 13 }}>No items match your filters.</div>
      )}
    </div>
  );
}
