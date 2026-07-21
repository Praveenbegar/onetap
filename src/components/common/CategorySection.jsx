import { Link } from "react-router-dom";
import "./CategorySection.css";
import categories from "../../data/categories";

function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">

        <div className="section-heading">
          <h2>Browse Categories</h2>

          <p>
            Quickly access official resources by selecting a category.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((category) => {

            const Icon = category.icon;

            return (

              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="category-card"
              >

                <div className="category-icon">
                  <Icon size={42} strokeWidth={2} />
                </div>

                <h3>{category.title}</h3>

                <p className="category-description">
                  {category.description}
                </p>

              </Link>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default CategorySection;