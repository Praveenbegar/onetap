import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { formatDate } from "../lib/helpers";
import usePageTitle from "../lib/usePageTitle";

export default function Latest() {
  usePageTitle("Latest Updates");
  const { resources, categories } = useData();

  const items = resources
    .filter((r) => r.latestUpdate)
    .sort((a, b) => new Date(b.updated || 0) - new Date(a.updated || 0));

  return (
    <section className="page">
      <div className="container narrow">
        <div className="page-head">
          <h1>Latest Updates</h1>
          <p>Fresh notices and updates from official portals.</p>
        </div>

        <div className="timeline">
          {items.map((r) => {
            const cat = categories.find((c) => c.slug === r.category);
            return (
              <div key={r.slug} className={`t-item tone-${cat?.color || "blue"}`}>
                <span className="t-dot" />
                <div className="t-card">
                  <div className="t-top">
                    {cat && <span className="chip">{cat.title}</span>}
                    {r.updated && <time>{formatDate(r.updated)}</time>}
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.latestUpdate}</p>
                  <Link to={`/resource/${r.slug}`} className="t-link">View details <ArrowRight size={15} /></Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
