import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ArrowLeft, Inbox } from "lucide-react";
import { useData } from "../context/DataContext";
import ResourceCard from "../components/ResourceCard";
import { CategoryIcon } from "../lib/icons";
import { searchResources } from "../lib/search";
import usePageTitle from "../lib/usePageTitle";
import NotFound from "./NotFound";

export default function CategoryResources() {
  const { category: slug } = useParams();
  const { categories, resources } = useData();
  const [q, setQ] = useState("");

  const category = categories.find((c) => c.slug === slug);
  usePageTitle(category?.title);
  if (!category) return <NotFound />;
  const all = resources.filter((r) => r.category === slug);
  const items = q.trim() ? searchResources(all, categories, q) : all;

  return (
    <section className="page">
      <div className="container">
        <Link to="/categories" className="back-link"><ArrowLeft size={16} /> All categories</Link>

        <div className={`cat-hero tone-${category.color}`}>
          <span className="cat-icon big"><CategoryIcon name={category.icon} size={34} /></span>
          <div>
            <h1>{category.title}</h1>
            <p>{category.description} · {all.length} {all.length === 1 ? "resource" : "resources"}</p>
          </div>
          {all.length > 3 && (
            <label className="filter">
              <Search size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search in ${category.title}`} />
            </label>
          )}
        </div>

        {items.length > 0 ? (
          <div className="rgrid">
            {items.map((r) => <ResourceCard key={r.slug} resource={r} />)}
          </div>
        ) : (
          <div className="empty">
            <Inbox size={44} />
            <h2>{all.length ? "Nothing found" : "Coming soon"}</h2>
            <p>{all.length ? "Try a different keyword." : "Resources for this category are being added."}</p>
            <Link to="/contact" className="btn btn-primary">Suggest a link</Link>
          </div>
        )}
      </div>
    </section>
  );
}
