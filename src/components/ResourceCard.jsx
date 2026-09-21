import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, CalendarDays } from "lucide-react";
import { useData } from "../context/DataContext";
import { formatDate } from "../lib/helpers";
import { CategoryIcon } from "../lib/icons";

export default function ResourceCard({ resource: r }) {
  const { categories } = useData();
  const cat = categories.find((c) => c.slug === r.category);

  return (
    <article className={`rcard tone-${cat?.color || "blue"}`}>
      <div className="rcard-top">
        <span className="rcard-icon"><CategoryIcon name={cat?.icon} size={20} /></span>
        <div className="rcard-meta">
          <span className="chip">{cat?.title || r.kind}</span>
        </div>
      </div>

      <h3><Link to={`/resource/${r.slug}`}>{r.title}</Link></h3>
      <p className="rcard-desc">{r.description}</p>

      {r.updated && (
        <span className="rcard-date"><CalendarDays size={14} /> Updated {formatDate(r.updated)}</span>
      )}

      <div className="rcard-actions">
        <Link to={`/resource/${r.slug}`} className="btn btn-soft">
          Details <ArrowRight size={16} />
        </Link>
        {r.website && (
          <a href={r.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Official Site <ExternalLink size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
