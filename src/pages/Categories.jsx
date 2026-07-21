import { useNavigate } from "react-router-dom";
import categories from "../data/categories";
import "./Categories.css";

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-page">
      <div className="categories-container">

        <div className="page-heading">
          <h1>All Categories</h1>
          <p>Browse all official resources category wise.</p>
        </div>

        <div className="categories-grid">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <div
                className="category-page-card"
                key={category.id}
                onClick={() =>
                  navigate(`/categories/${category.slug}`)
                }
              >
                <Icon size={42} />

                <h2>{category.title}</h2>

                <p className="category-description">
  {category.description}
</p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Categories;