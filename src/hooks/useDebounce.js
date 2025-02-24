import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout for the value to update after the delay
    // This will clear and reset the timeout every time the value changes
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that runs every time the effect is re-triggered
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-trigger the effect if the value or delay changes

  // Return the debounced value
  return debouncedValue;
}

export default useDebounce;
