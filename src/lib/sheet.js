// Google Sheet (published CSV) -> resources.
// Known sheet columns: slug, title, category, kind, description, website,
// apply_link, latest_update, updated, tags, popular, quick
// Any other extra columns (Last Date, Exam Date, Fee ...) are shown
// automatically in the "details" table.
import { slugify, toBool } from "./helpers";

export function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false;
      } else cell += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== "")) rows.push(row);
  return rows;
}

const KNOWN = new Set([
  "slug", "title", "fullname", "full_name", "category", "kind", "description",
  "website", "apply_link", "applylink", "latest_update", "latestupdate",
  "updated", "tags", "popular", "quick",
]);

export function sheetToResources(csvText, categories) {
  const rows = parseCSV(csvText);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  const catLookup = {};
  categories.forEach((c) => {
    catLookup[c.slug] = c.slug;
    catLookup[c.title.toLowerCase()] = c.slug;
  });

  return rows.slice(1).map((cells) => {
    const rec = {};
    const details = {};
    headers.forEach((h, i) => {
      const val = (cells[i] || "").trim();
      const key = h.toLowerCase().replace(/\s+/g, "_");
      if (!val) return;
      if (KNOWN.has(key)) rec[key] = val;
      else if (h) details[h] = val;
    });
    if (!rec.title) return null;
    return {
      slug: rec.slug || slugify(rec.title),
      title: rec.title,
      fullName: rec.fullname || rec.full_name || "",
      category: catLookup[(rec.category || "").toLowerCase()] || slugify(rec.category || "") || "",
      kind: rec.kind || "Resource",
      description: rec.description || "",
      website: rec.website || "",
      applyLink: rec.apply_link || rec.applylink || "",
      updated: rec.updated || "",
      latestUpdate: rec.latest_update || rec.latestupdate || "",
      tags: rec.tags ? rec.tags.split(/[,;|]/).map((t) => t.trim()).filter(Boolean) : [],
      popular: toBool(rec.popular),
      quick: toBool(rec.quick),
      details,
    };
  }).filter(Boolean);
}
