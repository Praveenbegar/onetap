import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound({ message = "This page could not be found." }) {
  return (
    <section className="page">
      <div className="container">
        <div className="empty">
          <Compass size={48} />
          <h1>404</h1>
          <p>{message}</p>
          <Link to="/" className="btn btn-primary btn-lg">Go to Home</Link>
        </div>
      </div>
    </section>
  );
}
