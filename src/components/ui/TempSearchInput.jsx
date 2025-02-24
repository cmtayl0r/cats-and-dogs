import React, { useState, useRef, useEffect } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  // Example list of suggestions
  const allSuggestions = [
    "Apple",
    "Banana",
    "Orange",
    "Grape",
    "Strawberry",
    "Pineapple",
  ];

  // Update suggestions when query changes
  useEffect(() => {
    if (query) {
      const filtered = allSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputFocus = () => {
    setOpen(true);
  };

  // Delay closing to allow suggestion click events to fire
  const handleInputBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Search..."
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "200px", padding: "8px" }}
      />
      <popover
        open={open}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        {suggestions.length > 0 && (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </popover>
    </div>
  );
};

export default SearchInput;
