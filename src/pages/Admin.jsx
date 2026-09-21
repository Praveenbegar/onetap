import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Download, Upload, RotateCcw, X, Save, Search, Info, LogOut } from "lucide-react";
import { useData } from "../context/DataContext";
import { slugify } from "../lib/helpers";
import usePageTitle from "../lib/usePageTitle";

const KINDS = ["Exam", "Service", "Website", "University", "Board", "Job Portal", "Scholarship", "Resource"];

const blank = (category) => ({
  slug: "", title: "", fullName: "", category: category || "", kind: "Website",
  description: "", website: "", applyLink: "", latestUpdate: "",
  updated: new Date().toISOString().slice(0, 10), tags: [], popular: false, quick: false,
  details: {},
});

function Editor({ item, categories, onSave, onCancel, isNew }) {
  const [f, setF] = useState({ ...item, tags: (item.tags || []).join(", ") });
  const [rows, setRows] = useState(Object.entries(item.details || {}).map(([k, v]) => ({ k, v })));
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const details = {};
    rows.forEach(({ k, v }) => { if (k.trim() && v.trim()) details[k.trim()] = v.trim(); });
    onSave({
      ...f,
      slug: (f.slug || slugify(f.title)).trim(),
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
      details,
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="modal" onSubmit={submit}>
        <div className="modal-head">
          <h2>{isNew ? "Add new resource" : "Edit resource"}</h2>
          <button type="button" className="icon-btn" onClick={onCancel}><X size={20} /></button>
        </div>

        <div className="form-grid">
          <label>Title *<input required value={f.title} onChange={set("title")} placeholder="e.g. NEET UG" /></label>
          <label>Category *
            <select required value={f.category} onChange={set("category")}>
              <option value="">- select -</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </label>
          <label>Type
            <select value={f.kind} onChange={set("kind")}>{KINDS.map((k) => <option key={k}>{k}</option>)}</select>
          </label>
          <label>Official website *<input required type="url" value={f.website} onChange={set("website")} placeholder="https://..." /></label>
          <label>Apply / Login link<input type="url" value={f.applyLink} onChange={set("applyLink")} placeholder="https://... (optional)" /></label>
          <label>Full name<input value={f.fullName} onChange={set("fullName")} placeholder="NEET UG 2026 (optional)" /></label>
          <label className="span-2">Short description<textarea rows={2} value={f.description} onChange={set("description")} /></label>
          <label className="span-2">Latest update<textarea rows={2} value={f.latestUpdate} onChange={set("latestUpdate")} placeholder="Latest notice / result / date..." /></label>
          <label>Updated on<input type="date" value={f.updated} onChange={set("updated")} /></label>
          <label>Tags (comma separated)<input value={f.tags} onChange={set("tags")} placeholder="neet, medical, nta" /></label>
          <label>Slug (URL)<input value={f.slug} onChange={set("slug")} placeholder={slugify(f.title) || "auto"} disabled={!isNew} /></label>
          <div className="checks">
            <label className="check"><input type="checkbox" checked={f.popular} onChange={set("popular")} /> Show in "Most Used"</label>
            <label className="check"><input type="checkbox" checked={f.quick} onChange={set("quick")} /> Show in "Quick Access"</label>
          </div>
        </div>

        <div className="rows-head">
          <h3>Extra details <small>(Last Date, Exam Date, Fee, Eligibility ... anything)</small></h3>
          <button type="button" className="btn btn-soft" onClick={() => setRows([...rows, { k: "", v: "" }])}><Plus size={15} /> Add row</button>
        </div>
        {rows.map((r, i) => (
          <div className="detail-row" key={i}>
            <input placeholder="Label (e.g. Last Date)" value={r.k} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, k: e.target.value } : x))} />
            <input placeholder="Value (text or https:// link)" value={r.v} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, v: e.target.value } : x))} />
            <button type="button" className="icon-btn danger" onClick={() => setRows(rows.filter((_, j) => j !== i))}><Trash2 size={16} /></button>
          </div>
        ))}

        <div className="modal-foot">
          <button type="button" className="btn btn-soft" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary"><Save size={16} /> Save</button>
        </div>
      </form>
    </div>
  );
}

export default function Admin({ onLogout }) {
  usePageTitle("Admin");
  const { resources, categories, source, saveLocal, resetLocal } = useData();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null); // {item, isNew}
  const fileRef = useRef(null);

  const persist = (list) => saveLocal({ categories, resources: list });

  const onSave = (item) => {
    const exists = resources.some((r) => r.slug === item.slug);
    if (editing.isNew && exists) return alert("A resource with this slug already exists. Please change the title or slug.");
    const list = editing.isNew ? [item, ...resources] : resources.map((r) => (r.slug === item.slug ? item : r));
    persist(list);
    setEditing(null);
  };

  const remove = (r) => {
    if (confirm(`Delete "${r.title}"?`)) persist(resources.filter((x) => x.slug !== r.slug));
  };

  const download = () => {
    const blob = new Blob([JSON.stringify({ categories, resources }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "resources.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((t) => {
      try {
        const d = JSON.parse(t);
        if (!Array.isArray(d.resources)) throw new Error();
        saveLocal({ categories: d.categories || categories, resources: d.resources });
        alert(`${d.resources.length} resources imported.`);
      } catch {
        alert("This is not a valid resources.json file.");
      }
    });
    e.target.value = "";
  };

  const list = resources.filter((r) => `${r.title} ${r.category} ${r.kind}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="page">
      <div className="container">
        <div className="page-head">
          <h1>Admin - Manage Data</h1>
          <p>Add, edit or delete resources from here. No need to touch the code.</p>
        </div>

        <div className="callout">
          <Info size={20} />
          <div>
            <b>How this works</b>
            <p>
              Your changes show up instantly <b>in your browser</b> (preview). To make them visible to everyone, click{" "}
              <b>"Download JSON"</b>, replace <code>src/data/resources.json</code> with the file, and deploy.
              (Or use a Google Sheet - see the README.)
              {source === "sheet" && <> <b>A Google Sheet is currently active, so changes made here will not appear on the site.</b></>}
            </p>
          </div>
        </div>

        <div className="admin-bar">
          <label className="filter">
            <Search size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources..." />
          </label>
          <div className="admin-btns">
            <button className="btn btn-orange" onClick={() => setEditing({ item: blank(), isNew: true })}><Plus size={16} /> Add new</button>
            <button className="btn btn-soft" onClick={download}><Download size={16} /> Download JSON</button>
            <button className="btn btn-soft" onClick={() => fileRef.current.click()}><Upload size={16} /> Import</button>
            <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={importFile} />
            {source === "local" && (
              <button className="btn btn-soft" onClick={() => confirm("Discard local changes and go back to the original data?") && resetLocal()}>
                <RotateCcw size={16} /> Reset
              </button>
            )}
            {onLogout && (
              <button className="btn btn-soft" onClick={onLogout}><LogOut size={16} /> Logout</button>
            )}
          </div>
        </div>

        <div className="table-wrap">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category</th><th>Type</th><th>Updated</th><th></th></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.slug}>
                  <td><b>{r.title}</b><small>/{r.slug}</small></td>
                  <td>{categories.find((c) => c.slug === r.category)?.title || <em>-</em>}</td>
                  <td>{r.kind}</td>
                  <td>{r.updated}</td>
                  <td className="actions">
                    <button className="icon-btn" title="Edit" onClick={() => setEditing({ item: r, isNew: false })}><Pencil size={16} /></button>
                    <button className="icon-btn danger" title="Delete" onClick={() => remove(r)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={5} className="muted">Nothing found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Editor item={editing.item} isNew={editing.isNew} categories={categories} onSave={onSave} onCancel={() => setEditing(null)} />
      )}
    </section>
  );
}
