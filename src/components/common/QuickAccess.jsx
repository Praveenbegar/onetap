import "./QuickAccess.css";
import quickAccess from "../../data/quickAccess";

function QuickAccess() {
  return (
    <section className="quick-access">

      <div className="quick-access-container">

        <div className="section-heading">
          <h2>Quick Access</h2>

          <p>
            Open the most frequently used official portals in one click.
          </p>
        </div>

        <div className="quick-grid">

          {quickAccess.map((item) => (

            <button
              className="quick-card"
              key={item.id}
            >
              <span className="quick-title">
                {item.title}
              </span>

              <span className="quick-tag">
                {item.tag}
              </span>
            </button>

          ))}

        </div>

      </div>

    </section>
  );
}

export default QuickAccess;