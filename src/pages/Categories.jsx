import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
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

          

            return (
              <div
                className="category-page-card"
                key={category.id}
                onClick={() =>
                  navigate(`/categories/${category.slug}`)
                }
              >
               <div className="category-page-icon">
  <Icon
    icon={category.icon}
    width="38"
    height="38"
  />
</div>

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