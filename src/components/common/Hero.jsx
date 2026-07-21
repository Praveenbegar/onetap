import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

import resources from "../../data/resources";
import SearchSuggestion from "../search/SearchSuggestion";

function Hero() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchText.trim()) return [];

    return resources
      .filter((item) => {
        const keyword = searchText.toLowerCase();

        return (
          item.title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword)
        );
      })
      .slice(0, 6);
  }, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText)}`);

    setShowSuggestions(false);
  };

  const handleSelect = (title) => {
    setSearchText(title);
    setShowSuggestions(false);

    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-badge">
            Trusted • Organized • Easy to Find
          </span>

          <h1>
            Find Official Links
            <br />
            Without the Confusion
          </h1>

          <p>
            Search government websites, exam results,
            universities, jobs and important services from one place.
          </p>

          <div className="hero-search-wrapper">

            <div className="hero-search">

              <input
                type="text"
                placeholder="Search NEET, SSO, Passport..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <button onClick={handleSearch}>
                Search
              </button>

            </div>

            <SearchSuggestion
              suggestions={suggestions}
              visible={showSuggestions}
              onSelect={handleSelect}
            />

          </div>

          <div className="popular-searches">

            <span>Popular :</span>

            <button onClick={() => handleSelect("NEET")}>
              NEET
            </button>

            <button onClick={() => handleSelect("SSO")}>
              SSO
            </button>

            <button onClick={() => handleSelect("RPSC")}>
              RPSC
            </button>

            <button onClick={() => handleSelect("Passport")}>
              Passport
            </button>

            <button onClick={() => handleSelect("CUET")}>
              CUET
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;