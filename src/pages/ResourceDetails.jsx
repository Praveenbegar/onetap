import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, BadgeCheck, CalendarDays, Info } from "lucide-react";
import { useData } from "../context/DataContext";
import ResourceCard from "../components/ResourceCard";
import { formatDate, hostOf, isUrl } from "../lib/helpers";
import { CategoryIcon } from "../lib/icons";
import usePageTitle from "../lib/usePageTitle";
import NotFound from "./NotFound";

export default function ResourceDetails() {
  const { slug } = useParams();
  const { resources, categories } = useData();

  const r = resources.find((x) => x.slug === slug);
  usePageTitle(r?.title);
  if (!r) return <NotFound message="This resource could not be found." />;

  const cat = categories.find((c) => c.slug === r.category);
  const entries = Object.entries(r.details || {}).filter(([, v]) => v);
  const related = resources.filter((x) => x.category === r.category && x.slug !== r.slug).slice(0, 3);

  return (
    <section className="page">
      <div className="container narrow">
        <Link to={cat ? `/categories/${cat.slug}` : "/categories"} className="back-link">
          <ArrowLeft size={16} /> {cat?.title || "Categories"}
        </Link>

        <div className={`detail-head tone-${cat?.color || "blue"}`}>
          <span className="cat-icon big"><CategoryIcon name={cat?.icon} size={34} /></span>
          <div className="detail-title">
            <div className="detail-tags">
              {cat && <span className="chip">{cat.title}</span>}
              {r.kind && <span className="chip chip-outline">{r.kind}</span>}
              <span className="chip chip-green"><BadgeCheck size={14} /> Official</span>
            </div>
            <h1>{r.fullName || r.title}</h1>
            {r.description && <p>{r.description}</p>}
            {r.updated && <span className="rcard-date"><CalendarDays size={14} /> Updated {formatDate(r.updated)}</span>}
          </div>
        </div>

        <div className="detail-actions">
          {r.website && (
            <a href={r.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              Open Official Website <ExternalLink size={18} />
            </a>
          )}
          {r.applyLink && (
            <a href={r.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-orange btn-lg">
              Apply / Login <ExternalLink size={18} />
            </a>
          )}
        </div>

        {r.latestUpdate && (
          <div className="callout">
            <Info size={20} />
            <div><b>Latest update</b><p>{r.latestUpdate}</p></div>
          </div>
        )}

        {entries.length > 0 && (
          <div className="info-card">
            <h2>Details</h2>
            <dl className="info-list">
              {entries.map(([label, value]) => (
                <div key={label} className="info-row">
                  <dt>{label}</dt>
                  <dd>
                    {isUrl(value) ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="link-pill">
                        {hostOf(value)} <ExternalLink size={13} />
                      </a>
                    ) : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {related.length > 0 && (
          <div className="related">
            <h2>More in {cat?.title}</h2>
            <div className="rgrid">
              {related.map((x) => <ResourceCard key={x.slug} resource={x} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
