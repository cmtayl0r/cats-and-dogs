// Import hooks
import { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

// Context
import { useGlobalContext } from "../../context/GlobalContext";

// Import dependencies
import { Search, X } from "lucide-react";

// Import scoped styles
import styles from "./SearchLayout.module.css";

// Services
import { API_SEARCH } from "../../services/apiConfig";

function SearchLayout() {
  const { updateSelectedLocation } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useFetch(API_SEARCH, debouncedQuery);
  const dropdownRef = useRef(null);

  /*
    On input change, user types at least 3 characters for debounce to trigger
    Search via API, debounce input
    If input recognised after debounce, open dropdown, display results
    On result selection (click), close dropdown, display selected result
    On result selection sends id to context, which updates the location layout
    On result selection, clear input
    On manual input clear (x), close dropdown, current id remains in context, clear query
    On click outside dropdown, close dropdown, current id remains in context, clear query
  */

  const countryCodeToEmoji = (countryCode) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length >= 3);
  };

  const handleSelectLocation = (locationId) => {
    updateSelectedLocation(locationId); // Update context with selected location
    setQuery(""); // Clear input field
    setShowSuggestions(false); // Hide dropdown
  };

  const handleClearInput = () => {
    setQuery("");
    // updateSelectedLocation(null);
    setShowSuggestions(false);
  };

  // Show dropdown only if there are results and the query is valid
  useEffect(() => {
    setShowSuggestions(data?.list?.length > 0 && query.length >= 3);
  }, [data, query]);

  return (
    <div className={styles["search"]} ref={dropdownRef}>
      <div className={styles["search__input"]}>
        <input
          type="search"
          placeholder="Enter location ..."
          value={query}
          onChange={handleInputChange}
        />
        {/* <Search className={styles["icon"]} /> */}
        {/* {query && <X onClick={handleClearInput} className={styles["icon"]} />} */}
      </div>
      {showSuggestions && (
        <div className={styles["suggestions__dropdown"]}>
          <ul>
            {isLoading && <li>Loading...</li>}
            {data?.list?.map((city) => (
              <li key={city.id}>
                <a
                  className="suggestions__item"
                  onClick={() => handleSelectLocation(city.id)}
                >
                  {countryCodeToEmoji(city.sys.country)}
                  {city.name}, {city.sys.country}, {city.main.temp}°C
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchLayout;
