// Simple relevance search: title > tags > category > description
export function searchResources(resources, categories, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const catTitle = Object.fromEntries(categories.map((c) => [c.slug, c.title.toLowerCase()]));

  return resources
    .map((r) => {
      const title = `${r.title} ${r.fullName || ""}`.toLowerCase();
      const tags = (r.tags || []).join(" ").toLowerCase();
      const cat = catTitle[r.category] || "";
      const desc = `${r.description || ""} ${r.latestUpdate || ""}`.toLowerCase();

      let score = 0;
      for (const w of words) {
        let hit = 0;
        if (title.startsWith(w)) hit = 100;
        else if (title.includes(w)) hit = 70;
        else if (tags.includes(w)) hit = 50;
        else if (cat.includes(w)) hit = 30;
        else if (desc.includes(w)) hit = 15;
        if (!hit) return { r, score: 0 }; // every word must match somewhere
        score += hit;
      }
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}
