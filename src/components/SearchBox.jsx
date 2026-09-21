import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { searchResources } from "../lib/search";

export default function SearchBox({ initial = "", large = false, autoFocus = false }) {
  const { resources, categories } = useData();
  const navigate = useNavigate();
  const [text, setText] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef(null);

  const suggestions = useMemo(
    () => searchResources(resources, categories, text).slice(0, 6),
    [resources, categories, text]
  );

  useEffect(() => {
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = (q) => {
    if (!q.trim()) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const openResource = (r) => {
    setOpen(false);
    navigate(`/resource/${r.slug}`);
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Enter") {
      if (active >= 0 && suggestions[active]) openResource(suggestions[active]);
      else go(text);
    } else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className={`searchbox ${large ? "large" : ""}`} ref={wrap}>
      <div className="searchbox-field">
        <Search size={20} className="searchbox-icon" />
        <input
          type="text"
          value={text}
          autoFocus={autoFocus}
          placeholder="Search NEET, SSO, Passport, RPSC..."
          onChange={(e) => { setText(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
        />
        <button onClick={() => go(text)}>Search</button>
      </div>

      {open && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((r, i) => (
            <li key={r.slug} className={i === active ? "active" : ""}
                onMouseEnter={() => setActive(i)} onMouseDown={() => openResource(r)}>
              <span className="s-title">{r.title}</span>
              <span className="s-cat">{categories.find((c) => c.slug === r.category)?.title || r.kind}</span>
              <ArrowUpRight size={16} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
