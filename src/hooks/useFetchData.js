import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

function useFetchData(url) {
  // 01 - STATE

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 02 - EFFECTS

  useEffect(() => {
    // Create a cancel token to cancel the request if needed
    const source = axios.CancelToken.source();

    async function fetchData() {
      try {
        setIsLoading(true); // Set loading state to true before making the request
        setError(""); // Clear any previous errors

        const response = await axios.get(url, {
          cancelToken: source.token, // Attach the cancel token to the request
        });

        if (response.data.Response === "False") {
          // If the API response indicates a failure, throw a custom error
          throw new Error("🤷 Results not found!");
        }

        setData(response.data); // Set the fetched data to state
        setError(""); // Clear any errors if the data fetch was successful
      } catch (error) {
        if (axios.isCancel(error)) {
          // If the error is due to the request being canceled, handle it separately
          console.log("Request canceled", error.message);
        } else {
          // Handle any other errors that occur
          setError(error.response ? error.response.data.error : error.message);
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
