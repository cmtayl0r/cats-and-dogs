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
import countryCodeToEmoji from "../../helpers/countryCodeToEmoji";

function SearchLayout() {
  // 01 - State
  const { updateSelectedLocation } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useFetch(API_SEARCH, debouncedQuery);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // TODO: Keyboard navigation for dropdown
  // FIXME: Dropdown not closing on click outside
  // FIXME: Clear input on click of "x" icon

  /*
    Behaviour:
    On input change, user types at least 3 characters for debounce to trigger
    Search via API, debounce input
    If input recognised after debounce, open dropdown, display results
    If results loading, display "Loading..." in dropdown
    if no results, display "No results found" in dropdown
    On result selection (click), close dropdown, display selected result
    On result selection sends id to context, which updates the location layout
    On result selection, clear input
    On manual input clear (x), close dropdown, current id remains in context, clear query
    On click outside dropdown, close dropdown, current id remains in context, clear query
  */

  // 02 - Derived state

  // 03 - Methods

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSelectLocation = (locationId) => {
    updateSelectedLocation(locationId); // Update context with selected location
    setQuery(""); // Clear input field
  };

  const handleClearInput = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  // 04 - Effects

  useEffect(() => {
    setShowSuggestions(
      debouncedQuery.length >= 3 && (isLoading || data?.list?.length >= 0)
    );
  }, [debouncedQuery, isLoading, data]);

  return (
    <div className={styles["search"]} ref={dropdownRef}>
      <div className={styles["search__input"]}>
        <input
          type="search"
          placeholder="Enter location ..."
          value={query}
          onChange={handleInputChange}
          ref={inputRef}
          aria-label="Search location"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="suggestions-dropdown"
        />
        {/* <Search className={styles["icon"]} /> */}
        {query && <X onClick={handleClearInput} className={styles["icon"]} />}
      </div>
      {showSuggestions && (
        <div
          className={styles["suggestions__dropdown"]}
          id="suggestions-dropdown"
          role="listbox"
          ref={dropdownRef}
        >
          <div className={styles["suggestions__content"]} aria-live="polite">
            {/* 
              if loading, show loading message 
              if no results, show no results message
              else, show results
            */}
            {isLoading ? (
              <p className={styles["suggestions__feedback"]}>Loading...</p>
            ) : data?.list?.length === 0 ? (
              <p className={styles["suggestions__feedback"]}>
                No results found
              </p>
            ) : (
              data?.list?.map((city) => (
                <a
                  key={city.id}
                  className={styles["suggestions__item"]}
                  onClick={() => handleSelectLocation(city.id)}
                  role="option"
                >
                  {countryCodeToEmoji(city.sys.country)}
                  {city.name}, {city.sys.country}, {city.main.temp}°C
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchLayout;
