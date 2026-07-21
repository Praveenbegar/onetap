import { useParams, Link } from "react-router-dom";
import categoryItems from "../data/categoryItems";
import "./SearchResults.css";

function CategoryResources() {
  const { category } = useParams();

  if (!category) {
    return (
      <section className="search-results-page">
        <div className="search-results-container">
          <h1>Category Not Found</h1>
        </div>
      </section>
    );
  }

  const items = categoryItems[category] || [];

  const heading = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <section className="search-results-page">
      <div className="search-results-container">

        <h1>{heading}</h1>

        <p>{items.length} Resources Available</p>

        <div className="search-results-grid">

          {items.map((item, index) => {

            const slug = item
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (

              <div
                key={index}
                className="resource-card"
              >

                <div className="resource-content">

                  <h3>{item}</h3>

                  <p>
                    Click below to view details.
                  </p>

                  <Link
                    to={`/details/${slug}`}
                    className="visit-btn"
                  >
                    Open
                  </Link>

                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default CategoryResources;