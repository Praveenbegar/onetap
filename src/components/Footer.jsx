import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import site from "../config/site";
import { useData } from "../context/DataContext";

export default function Footer() {
  const { categories } = useData();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <img src={logoIcon} alt="" />
            <span>One<b>Tap</b></span>
          </div>
          <p>{site.tagline} Government services, exams, jobs and university links - saaf, organised aur bharosemand.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/latest">Latest Updates</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Popular Categories</h4>
          <ul>
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}><Link to={`/categories/${c.slug}`}>{c.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>OneTap is an independent directory. We link only to official websites.</span>
      </div>
    </footer>
  );
}
