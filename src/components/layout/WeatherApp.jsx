// Dependencies
import { useState } from "react";
import sunny from "../../assets/images/sunny.png";
import cloudy from "../../assets/images/cloudy.png";
import rainy from "../../assets/images/rainy.png";
import snowy from "../../assets/images/snowy.png";
import loadingGif from "../../assets/images/loading.gif";
import { MapPinned, Search, Wind, Droplet } from "lucide-react";

// Local scoped styles
import styles from "./WeatherApp.module.css";

// Hooks
import useFetch from "../../hooks/useFetch";

function WeatherApp() {
  const [query, setQuery] = useState("");

  // TODO: Debounce hook for debouncedQuery

  const API_KEY = "53901fa0797c3c9403358b2d02c1f9c8";
  const { data, isLoading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=Metric&appid=${API_KEY}`
  );
  const dateOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const todaysDate = new Date().toLocaleDateString("en-GB", dateOptions);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["weather-app"]}>
        {/* Search */}
        <div className={styles["search"]}>
          <div className={styles["search__top"]}>
            <MapPinned size={20} className={styles["icon"]} />
            <span className={styles["search__location"]}>{data?.name}</span>
          </div>
          <div className={styles["search__input"]}>
            <input
              type="text"
              placeholder="Enter location ..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Search className={styles["icon"]} />
          </div>
        </div>
        {/* Display loading state */}
        {isLoading && (
          <img src={loadingGif} className={styles["loading"]} alt="loading" />
        )}
        {/* Display any errors */}
        {error && <p className={styles["not-found"]}>Error: {error} </p>}
        {/* Weather Info */}
        {data && ( // Display weather data if it exists)
          <>
            <div className={styles["weather__info"]}>
              <img src={sunny} alt="sunny" />
              <div className={styles["weather__type"]}>Clear</div>
              <span className={styles["weather__temp"]}>
                {Number(data?.main?.temp).toFixed(0)}&deg;
              </span>
            </div>
            <div className={styles["weather__date"]}>
              <p>{todaysDate}</p>
            </div>
            <div className={styles["weather__data"]}>
              <div className={styles["weather__data-item"]}>
                <span className={styles["weather__data-name"]}>Wind</span>
                <Wind className={styles["weather__data-icon"]} />
                <span className={styles["weather__data-value"]}>
                  {data?.wind.speed} km/h
                </span>
              </div>
              <div className={styles["weather__data-item"]}>
                <span className={styles["weather__data-name"]}>Humidity</span>
                <Droplet className={styles["weather__data-icon"]} />
                <span className={styles["weather__data-value"]}>
                  {data?.main.humidity}%
                </span>
              </div>
            </div>
          </>
        )}
        ;
      </div>
    </div>
  );
}

export default WeatherApp;
