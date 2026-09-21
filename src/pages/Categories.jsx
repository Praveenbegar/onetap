import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { CategoryIcon } from "../lib/icons";
import usePageTitle from "../lib/usePageTitle";

export default function Categories() {
  usePageTitle("All Categories");
  const { categories, resources } = useData();

  return (
    <section className="page">
      <div className="container">
        <div className="page-head">
          <h1>All Categories</h1>
          <p>Browse all official resources category wise.</p>
        </div>

        <div className="cat-grid">
          {categories.map((c) => {
            const n = resources.filter((r) => r.category === c.slug).length;
            return (
              <Link key={c.slug} to={`/categories/${c.slug}`} className={`cat-card tone-${c.color}`}>
                <span className="cat-icon"><CategoryIcon name={c.icon} size={26} /></span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <span className="cat-count">{n} {n === 1 ? "resource" : "resources"}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
