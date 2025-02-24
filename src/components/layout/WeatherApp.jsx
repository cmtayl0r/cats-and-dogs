// Dependencies
import { useState } from "react";
import sunny from "../../assets/images/sunny.png";
import cloudy from "../../assets/images/cloudy.png";
import rainy from "../../assets/images/rainy.png";
import snowy from "../../assets/images/snowy.png";
import loadingGif from "../../assets/images/loading.gif";
import { MapPinned, Search, Wind, Droplet } from "lucide-react";

// Services
import { API_SEARCH } from "../../services/apiConfig";

// Local scoped styles
import styles from "./WeatherApp.module.css";

// Hooks
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useFetch(API_SEARCH, debouncedQuery);

  const dateOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const todaysDate = new Date().toLocaleDateString("en-GB", dateOptions);

  const countryCodeToEmoji = (countryCode) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles["weather-app"]}>
        {/* Search */}
        <div className={styles["search"]}>
          <div className={styles["search__input"]}>
            <input
              type="text"
              placeholder="Enter location ..."
              value={query}
              onChange={handleInputChange}
            />
            <Search className={styles["icon"]} />
          </div>
          <div className={styles["search__suggestions"]}>
            <ul>
              {isLoading && <li>Loading...</li>}
              {data?.list?.map((city) => (
                <li key={city.id}>
                  <a
                    className="dropdown-item"
                    // onClick={() => onSelect(city)}
                  >
                    {countryCodeToEmoji(city.sys.country)}
                    {city.name}, {city.sys.country}, {city.main.temp}°C
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Display loading state */}
        {isLoading && (
          <img src={loadingGif} className={styles["loading"]} alt="loading" />
        )}
        {/* Display any errors */}
        {error && <p className={styles["not-found"]}>Error: {error} </p>}
        {/* 
          Empty state message when no data is available or a search has not been made
        */}
        {!data && <h3>Search for a location</h3>}
        {/* Display weather data if it exists */}
        {/* {data && (
          <>
            <div className={styles["weather__location"]}>
              <MapPinned size={20} className={styles["icon"]} />
              <span>{data?.name}</span>
            </div>
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
        ; */}
      </div>
    </div>
  );
}

export default WeatherApp;
