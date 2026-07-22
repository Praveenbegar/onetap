import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./CategorySection.css";
import categories from "../../data/categories";


const colors = [
  "#2563eb", // Blue
  "#7c3aed", // Purple
  "#16a34a", // Green
  "#ea580c", // Orange
  "#dc2626", // Red
  "#0891b2", // Cyan
  "#4f46e5", // Indigo
  "#db2777", // Pink
  "#0f766e", // Teal
  "#ca8a04", // Yellow
  "#475569", // Slate
  "#059669", // Emerald
];

const backgrounds = [
  "#eff6ff",
  "#f5f3ff",
  "#f0fdf4",
  "#fff7ed",
  "#fef2f2",
  "#ecfeff",
  "#eef2ff",
  "#fdf2f8",
  "#f0fdfa",
  "#fefce8",
  "#f8fafc",
  "#ecfdf5",
];

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

          {categories.map((category, index) => {

           

            return (

              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="category-card"
              >

                <div
  className="category-icon"
  style={{
    background: backgrounds[index],
  }}
>
  <Icon
    icon={category.icon}
    width="34"
    height="34"
  />
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