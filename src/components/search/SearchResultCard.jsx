import "./SearchResultCard.css";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchResultCard({ resource }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/resource/${resource.slug}`);
  };

  return (
    <div className="search-card">
      <div className="search-card-top">
        <span className="search-category">
          {resource.category}
        </span>

        <span className="search-updated">
          Updated {resource.updated}
        </span>
      </div>

      <h2>{resource.title}</h2>

      <p>{resource.description}</p>

      <button
        className="search-open-btn"
        onClick={handleOpen}
      >
        Open
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}

export default SearchResultCard;