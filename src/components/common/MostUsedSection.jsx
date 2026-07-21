import "./MostUsedSection.css";
import resources from "../../data/resources";
import { ArrowUpRight } from "lucide-react";

function MostUsedSection() {
  return (
    <section className="most-used">

      <div className="most-used-container">

        <div className="section-heading">

          <h2>Most Used Resources</h2>

          <p>
            Frequently accessed official websites and important portals.
          </p>

        </div>

        <div className="resource-grid">

          {resources.map((resource) => (

            <div
              className="resource-card"
              key={resource.id}
            >

              <div className="resource-top">

                <span className="resource-category">
                  {resource.category}
                </span>

                <span className="resource-update">
                  {resource.updated}
                </span>

              </div>

              <h3>
                {resource.title}
              </h3>

              <p>
                {resource.description}
              </p>

              <button>

                Open

                <ArrowUpRight size={18} />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default MostUsedSection;