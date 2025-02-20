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
import useFetchData from "../../hooks/useFetchData";

// 53901fa0797c3c9403358b2d02c1f9c8
//'api.openweathermap.org/geo/1.0/direct?q=${"Berlin"}&limit=1&appid=53901fa0797c3c9403358b2d02c1f9c8'

function WeatherApp() {
  const [query, setQuery] = useState("");

  // TODO: Debounce hook for debouncedQuery

  const API_KEY = "53901fa0797c3c9403358b2d02c1f9c8";
  const { data, isLoading, error } = useFetchData(
    "https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${API_KEY}"
  );

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles["weather-app"]}>
        {/* Search */}
        <div className={styles["search"]}>
          <div className={styles["search__top"]}>
            <MapPinned size={20} className={styles["icon"]} />
            <span className={styles["search__location"]}>{data.name}</span>
          </div>
          <div className={styles["search__input"]}>
            <input type="text" placeholder="Enter location ..." />
            <Search className={styles["icon"]} />
          </div>
        </div>
        {/* Weather Info */}
        <div className={styles["weather__info"]}>
          <img src={sunny} alt="sunny" />
          <div className={styles["weather__type"]}>Clear</div>
          <span className={styles["weather__temp"]}>28&deg;</span>
        </div>
        <div className={styles["weather__date"]}>
          <p>Fri, 30 Feb</p>
        </div>
        {/* Weather Data */}
        <div className={styles["weather__data"]}>
          <div className={styles["weather__data-item"]}>
            <span className={styles["weather__data-name"]}>Wind</span>
            <Wind className={styles["weather__data-icon"]} />
            <span className={styles["weather__data-value"]}>5 km/h</span>
          </div>
          <div className={styles["weather__data-item"]}>
            <span className={styles["weather__data-name"]}>Humidity</span>
            <Droplet className={styles["weather__data-icon"]} />
            <span className={styles["weather__data-value"]}>60%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
