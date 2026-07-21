import "./SearchResults.css";
import { useLocation } from "react-router-dom";
import resources from "../data/resources";
import SearchResultCard from "../components/search/SearchResultCard";

function SearchResults() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const results = resources.filter((item) => {
    const keyword = query.toLowerCase();

    return (
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="search-results-page">
      <div className="search-results-container">

        <h1>Search Results</h1>

        <p>
          {results.length} result(s) found for <strong>"{query}"</strong>
        </p>

        {results.length === 0 ? (
          <div className="no-results">
            <h2>No Results Found</h2>
            <p>Try another keyword.</p>
          </div>
        ) : (
          <div className="search-results-grid">
            {results.map((item) => (
              <SearchResultCard
                key={item.id}
                resource={item}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default SearchResults;