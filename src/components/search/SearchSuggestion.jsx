import "./SearchSuggestion.css";

function SearchSuggestion({
  suggestions,
  onSelect,
  visible,
}) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="search-suggestion">

      {suggestions.map((item) => (

        <div
          key={item.id}
          className="suggestion-item"
          onClick={() => onSelect(item.title)}
        >
          <span>{item.title}</span>

          <small>{item.category}</small>
        </div>

      ))}

    </div>
  );
}

export default SearchSuggestion;