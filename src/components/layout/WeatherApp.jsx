// Dependencies
import { useState, useEffect } from "react";

import loadingGif from "../../assets/images/loading.gif";
import { MapPinned, Search, Wind, Droplet, X } from "lucide-react";

// Services
import { API_SEARCH } from "../../services/apiConfig";
import { API_LOCATION_ID } from "../../services/apiConfig";

// Local scoped styles
import styles from "./WeatherApp.module.css";

// Hooks
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useFetch(API_SEARCH, debouncedQuery);

  const {
    data: locationData,
    isLoading: locationIsLoading,
    error: locationError,
  } = useFetch(API_LOCATION_ID, selectedLocationId);

  

  return (
    <div className="weather-display">
      {/* Search */}
      
      
    </div>
  );
}

export default WeatherApp;
