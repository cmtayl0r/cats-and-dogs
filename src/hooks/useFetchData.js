import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

function useFetchData(url, options = {}) {
  // 01 - STATE

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 02 - EFFECTS

  useEffect(() => {
    // Create a cancel token to cancel the request if needed
    const source = axios.CancelToken.source();

    async function fetchData() {
      try {
        // Set loading state to true before making the request
        setIsLoading(true);
        // Clear any previous errors
        setError("");
        // Make a GET request to the URL
        const response = await axios.get(url, {
          cancelToken: source.token, // Attach the cancel token to the request
        });

        // If the response doesn't have data or has an error message, throw an error
        if (!response.data || response.data.Response === "False") {
          throw new Error("🤷 Results not found!");
        }
        // Set the fetched data to state
        setData(response.data);
        // Clear any previous errors
        setError("");
      } catch (error) {
        if (axios.isCancel(error)) {
          // If the error is due to the request being canceled, handle it separately
          console.log("Request canceled", error.message);
        } else {
          // Handle other errors by setting the error state
          setError(
            error.response?.data?.error ||
              error.message ||
              "An unknown error occurred."
          );
        }
      } finally {
        // Always set loading to false once the request is complete
        setIsLoading(false);
      }
    }

    fetchData(); // Call the function to fetch data

    return () => {
      // Cleanup: cancel the request if the component is unmounted or the effect is re-run
      source.cancel("Operation canceled by the user.");
    };
  }, [url]); // Dependency array: Effect runs whenever the URL changes

  // Return an object containing the fetched data, loading status, and error message
  return { data, isLoading, error };
}

export default useFetchData;
