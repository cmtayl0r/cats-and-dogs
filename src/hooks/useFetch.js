import { useState, useEffect } from "react";

function useFetch(url, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip fetching if URL is falsy
    // (e.g. if the component is unmounted or the URL is not yet set)
    if (!url) return;

    // Skip fetching if query is too short or falsy
    if (!query || query.length < 3) {
      setData([]);
      // setError("Please enter at least 3 characters");
      return;
    }

    // Create an AbortController instance to cancel the fetch request if needed
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      // Set loading state to true before making the request
      setIsLoading(true);
      // Clear any previous errors
      setError(null);

      try {
        const response = await fetch(`${url}${query}`, { signal });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        // Set the fetched data to state or null if the result is empty
        setData(result || []);
      } catch (error) {
        // If the fetch request was cancelled, don't set an error
        // Else, set the error state
        if (error.name !== "AbortError") {
          setError(error.message);
          console.error("Error fetching data:", error);
        }
      } finally {
        // Always set loading to false once the request is complete
        setIsLoading(false);
      }
    };

    // Call the async fetchData function
    fetchData();

    // Cleanup function to cancel the fetch request
    return () => {
      controller.abort();
    };
  }, [url, query]); // Dependency array: Effect runs whenever the URL or query changes

  // Return an object containing the fetched data, loading status, and error message
  return { data, isLoading, error };
}

export default useFetch;
