import { Link } from "react-router-dom";
import { Target, ShieldCheck, Heart } from "lucide-react";
import usePageTitle from "../lib/usePageTitle";
import site from "../config/site";

export default function About() {
  usePageTitle("About");
  return (
    <section className="page">
      <div className="container narrow">
        <div className="page-head">
          <h1>About {site.name}</h1>
          <p>{site.tagline}</p>
        </div>

        <div className="prose">
          <p>
            Finding an official website on the internet is often confusing - fake portals, outdated links and
            plenty of duplicate results. <b>{site.name}</b> solves this problem: the official link for every
            important government service, exam, result, university and job portal, <b>all in one place</b>.
          </p>
        </div>

        <div className="why-grid three">
          <div className="why">
            <span className="why-icon"><Target size={22} /></span>
            <h3>Our Mission</h3>
            <p>To give every student and job seeker the right official link in 10 seconds.</p>
          </div>
          <div className="why">
            <span className="why-icon"><ShieldCheck size={22} /></span>
            <h3>Only Official</h3>
            <p>We link only to official websites. We are not affiliated with any government body.</p>
          </div>
          <div className="why">
            <span className="why-icon"><Heart size={22} /></span>
            <h3>Free Forever</h3>
            <p>No login, no fee. Just search and go.</p>
          </div>
        </div>

        <p className="disclaimer">
          Disclaimer: {site.name} is an independent directory. Dates and details may change - always verify
          on the official website before applying.
        </p>

        <div className="center"><Link to="/contact" className="btn btn-primary btn-lg">Contact us</Link></div>
      </div>
    </section>
  );
}
