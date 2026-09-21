import { Link } from "react-router-dom";
import { ShieldCheck, Zap, Layers, ExternalLink } from "lucide-react";
import SearchBox from "../components/SearchBox";
import SectionHeading from "../components/SectionHeading";
import ResourceCard from "../components/ResourceCard";
import { useData } from "../context/DataContext";
import { CategoryIcon } from "../lib/icons";
import usePageTitle from "../lib/usePageTitle";
import site from "../config/site";

export default function Home() {
  usePageTitle("");
  const { resources, categories } = useData();

  const popular = resources.filter((r) => r.popular).slice(0, 12);
  const quick = resources.filter((r) => r.quick).slice(0, 12);
  const count = (slug) => resources.filter((r) => r.category === slug).length;
  const chips = popular.slice(0, 5);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-badge"><ShieldCheck size={16} /> Only official links · Verified sources</span>
          <h1>
            Find every <span className="hl-orange">official link</span><br />
            in <span className="hl-underline">one tap</span>
          </h1>
          <p>
            Government services, exam portals, results, universities aur jobs -
            everything in one place, without the confusion.
          </p>

          <SearchBox large />

          <div className="hero-chips">
            <span>Popular:</span>
            {chips.map((r) => (
              <Link key={r.slug} to={`/resource/${r.slug}`}>{r.title}</Link>
            ))}
          </div>

          <div className="hero-stats">
            <div><b>{resources.length}+</b><span>Official links</span></div>
            <div><b>{categories.length}</b><span>Categories</span></div>
            <div><b>100%</b><span>Free to use</span></div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Quick Access" subtitle="The most-used portals - one click away." />
          <div className="quick-grid">
            {quick.map((r) => {
              const cat = categories.find((c) => c.slug === r.category);
              return (
                <Link key={r.slug} to={`/resource/${r.slug}`} className={`quick-card tone-${cat?.color || "blue"}`}>
                  <span className="quick-icon"><CategoryIcon name={cat?.icon} size={20} /></span>
                  <span className="quick-text">
                    <b>{r.title}</b>
                    <small>{cat?.title}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Browse Categories" subtitle="Pick a category and explore official resources." to="/categories" />
          <div className="cat-grid">
            {categories.map((c) => {
              const n = count(c.slug);
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

      {/* POPULAR */}
      <section className="section">
        <div className="container">
          <SectionHeading title="Most Used Resources" subtitle="Students aur job seekers ke favourite official websites." to="/latest" linkText="Latest updates" />
          <div className="rgrid">
            {popular.map((r) => <ResourceCard key={r.slug} resource={r} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section section-alt">
        <div className="container why-grid">
          <div className="why">
            <span className="why-icon"><Zap size={22} /></span>
            <h3>Fast</h3>
            <p>Search or pick a category - reach the official portal in 2-3 taps.</p>
          </div>
          <div className="why">
            <span className="why-icon"><ShieldCheck size={22} /></span>
            <h3>Trusted</h3>
            <p>Only official government and institution websites. No fake or third-party links.</p>
          </div>
          <div className="why">
            <span className="why-icon"><Layers size={22} /></span>
            <h3>Organised</h3>
            <p>Dates, eligibility, fee and latest updates - all on one clean page.</p>
          </div>
          <div className="why">
            <span className="why-icon"><ExternalLink size={22} /></span>
            <h3>Always Updated</h3>
            <p>{site.name} resources are updated regularly.</p>
          </div>
        </div>
      </section>
    </>
  );
}
