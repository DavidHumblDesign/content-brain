import { useState } from "react";

const PILLAR_COLORS = ["#60A5FA", "#A78BFA", "#F59E0B", "#34D399", "#F87171", "#38BDF8", "#E879F9", "#22D3EE", "#FB923C", "#A3E635"];

export default function Pillars({ pillars, setPillars, backlog }) {
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", color: "#60A5FA", topics: "" });

  const getBacklogCount = (pillarId) => (backlog || []).filter(b => b.pillarId === pillarId).length;
  const getPublishedCount = (pillarId) => (backlog || []).filter(b => b.pillarId === pillarId && b.status === "published").length;

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, color: p.color, topics: (p.topics || []).join(", ") });
  };

  const saveEdit = () => {
    if (!form.name.trim()) return;
    setPillars(prev => prev.map(p => p.id === editingId ? {
      ...p,
      name: form.name.trim(),
      description: form.description.trim(),
      color: form.color,
      topics: form.topics.split(",").map(t => t.trim()).filter(Boolean),
    } : p));
    setEditingId(null);
    setForm({ name: "", description: "", color: "#60A5FA", topics: "" });
  };

  const addPillar = () => {
    if (!form.name.trim()) return;
    const newId = Math.max(0, ...pillars.map(p => p.id)) + 1;
    setPillars(prev => [...prev, {
      id: newId,
      name: form.name.trim(),
      description: form.description.trim(),
      color: form.color,
      topics: form.topics.split(",").map(t => t.trim()).filter(Boolean),
    }]);
    setAdding(false);
    setForm({ name: "", description: "", color: "#60A5FA", topics: "" });
  };

  const deletePillar = (id) => {
    if (window.confirm("Delete this pillar? Content won't be deleted, just unlinked.")) {
      setPillars(prev => prev.filter(p => p.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  };

  const cancelForm = () => {
    setEditingId(null);
    setAdding(false);
    setForm({ name: "", description: "", color: "#60A5FA", topics: "" });
  };

  const inputSt = { width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

  const renderForm = (onSave, saveLabel) => (
    <div style={{ background: "#2A2724", borderRadius: 12, padding: 20, border: "1px solid #3A3632", marginBottom: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 6 }}>Pillar Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. SaaS & Startup Design" style={inputSt} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 6 }}>Description</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What this pillar covers..." rows={2} style={{ ...inputSt, resize: "vertical" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 6 }}>Topics (comma-separated)</label>
          <input value={form.topics} onChange={e => setForm(f => ({ ...f, topics: e.target.value }))} placeholder="e.g. hero sections, SaaS UX, conversion" style={inputSt} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 6 }}>Color</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {PILLAR_COLORS.map(c => (
              <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{
                width: 28, height: 28, borderRadius: 6, background: c, border: form.color === c ? "2px solid #E8E4E0" : "2px solid transparent",
                cursor: "pointer", transition: "transform 0.15s",
              }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button onClick={onSave} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{saveLabel}</button>
          <button onClick={cancelForm} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 20px", color: "#8A8580", fontSize: 13, cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Content Pillars</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>Your core content themes — everything you create maps to a pillar</p>
        </div>
        {!adding && !editingId && (
          <button onClick={() => setAdding(true)} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Add Pillar</button>
        )}
      </div>

      {adding && renderForm(addPillar, "Add Pillar")}
      {editingId && renderForm(saveEdit, "Save Changes")}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260, 1fr))", gap: 12 }}>
        {pillars.map(p => {
          const isExpanded = expandedId === p.id;
          const backlogCount = getBacklogCount(p.id);
          const publishedCount = getPublishedCount(p.id);
          const inBacklog = backlogCount - publishedCount;

          return (
            <div key={p.id} style={{
              background: "#2A2724", borderRadius: 12, border: isExpanded ? `1px solid ${p.color}60` : "1px solid #3A3632",
              overflow: "hidden", transition: "border-color 0.2s",
            }}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
                style={{ padding: "16px 18px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 4, background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#E8E4E0" }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 12, color: "#8A8580", lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {p.description}
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
                  <span style={{ color: "#6A6560" }}>{publishedCount} published</span>
                  <span style={{ color: inBacklog > 0 ? p.color : "#6A6560" }}>{inBacklog} in backlog</span>
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: "1px solid #3A3632", padding: "14px 18px" }}>
                  {p.topics && p.topics.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "#6A6560", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Topics</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {p.topics.map((t, i) => (
                          <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: `${p.color}18`, color: p.color }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content mapped to this pillar */}
                  {backlogCount > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "#6A6560", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Content ({backlogCount})</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {(backlog || []).filter(b => b.pillarId === p.id).slice(0, 5).map(b => (
                          <div key={b.id} style={{ fontSize: 12, color: "#E8E4E0", display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ color: b.status === "published" ? "#34D399" : b.status === "drafting" ? "#F59E0B" : "#6A6560", fontSize: 10 }}>
                              {b.status === "published" ? "✅" : b.status === "drafting" ? "✏️" : b.status === "planned" ? "📋" : "💡"}
                            </span>
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</span>
                          </div>
                        ))}
                        {backlogCount > 5 && <span style={{ fontSize: 11, color: "#6A6560" }}>+{backlogCount - 5} more</span>}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={(e) => { e.stopPropagation(); startEdit(p); }} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#8A8580", cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); deletePillar(p.id); }} style={{ background: "none", border: "1px solid #F8717130", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#F87171", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {pillars.length === 0 && !adding && (
        <div style={{ background: "#2A2724", borderRadius: 12, padding: "40px 20px", border: "1px solid #3A3632", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏛️</div>
          <div style={{ fontSize: 14, color: "#8A8580" }}>No content pillars yet</div>
          <div style={{ fontSize: 12, color: "#6A6560", marginTop: 4 }}>Add your core content themes to organize everything you create.</div>
        </div>
      )}
    </div>
  );
}
