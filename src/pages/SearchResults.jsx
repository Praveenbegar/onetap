import { useSearchParams, Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { useData } from "../context/DataContext";
import { searchResources } from "../lib/search";
import ResourceCard from "../components/ResourceCard";
import SearchBox from "../components/SearchBox";
import usePageTitle from "../lib/usePageTitle";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { resources, categories } = useData();
  usePageTitle(query ? `Search: ${query}` : "Search");

  const results = searchResources(resources, categories, query);

  return (
    <section className="page">
      <div className="container">
        <div className="page-head">
          <h1>Search Results</h1>
          <p>
            {query ? <><b>{results.length}</b> result(s) for <b>"{query}"</b></> : "Search for something."}
          </p>
        </div>

        <div className="search-top"><SearchBox key={query} initial={query} /></div>

        {results.length > 0 ? (
          <div className="rgrid">
            {results.map((r) => <ResourceCard key={r.slug} resource={r} />)}
          </div>
        ) : (
          query && (
            <div className="empty">
              <SearchX size={44} />
              <h2>No results found</h2>
              <p>Try a different keyword or browse by category.</p>
              <Link to="/categories" className="btn btn-primary">Browse categories</Link>
            </div>
          )
        )}
      </div>
    </section>
  );
}
