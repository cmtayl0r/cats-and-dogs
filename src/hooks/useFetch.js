import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create an AbortController instance to cancel the fetch request if needed
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      // Set loading state to true before making the request
      setIsLoading(true);
      // Clear any previous errors
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        // Set the fetched data to state
        setData(result);
        // Clear any previous errors
        setError(null);
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
  }, [url]); // Dependency array: Effect runs whenever the URL changes

  // Return an object containing the fetched data, loading status, and error message
  return { data, isLoading, error };
}

export default useFetch;
