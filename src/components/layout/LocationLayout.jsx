// TODO: Break out smaller components
// TODO: Add favourite location to context
// TODO: Remove favourite location from context
// FIXME: Skeleton loading state design
// TODO: Add background gradient based on weather type
// FIXME: Create more efficient component for weather image
// TODO: Refactor hooks to use axios for calls with params

// Import hooks
import useFetch from "../../hooks/useFetch";

// Context
import { useGlobalContext } from "../../context/GlobalContext";

// Import dependencies
import { MapPinned, Wind, Droplet, Haze } from "lucide-react";
import loadingGif from "../../assets/images/loading.gif";
import sunny from "../../assets/images/sunny.png";
import cloudy from "../../assets/images/cloudy.png";
import rainy from "../../assets/images/rainy.png";
import snowy from "../../assets/images/snowy.png";

// Services
import { API_LOCATION_ID } from "../../services/apiConfig";
import getTodaysDate from "../../helpers/todaysDate";
import getTimeInTimezone from "../../helpers/timeInTimezone";

// Local scoped styles
import styles from "./LocationLayout.module.css";

function LocationLayout() {
  // 1. State
  const { selectedLocation, addFavoriteLocation, removeFavoriteLocation } =
    useGlobalContext();
  const { data, isLoading, error } = useFetch(
    API_LOCATION_ID,
    selectedLocation
  );

  const weatherImages = {
    "01d": sunny,
    "01n": sunny,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "13d": snowy,
    "13n": snowy,
    "50d": cloudy,
    "50n": cloudy,
  };

  const weatherImage = data?.weather?.[0]?.icon
    ? weatherImages[data.weather[0].icon]
    : null;

  // const backgroundGradients = {
  //   "01d": "linear-gradient(to bottom, #f6d365, #fda085)",
  //   "01n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "02d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "02n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "03d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "03n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "04d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "04n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "09d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "09n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "10d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "10n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "13d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "13n": "linear-gradient(to bottom, #141e30, #243b55)",
  //   "50d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  //   "50n": "linear-gradient(to bottom, #141e30, #243b55)",
  // };

  // const backgroundGradient = data?.weather?.[0]?.icon
  //   ? backgroundGradients[data.weather[0].icon]
  //   : null;

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <div>
          <img src={loadingGif} className={styles["loading"]} alt="loading" />
          <h1>Loading</h1>
          {/* Skeleton loading display */}
        </div>
      )}
      {/* Error */}
      {error && <p className={styles["not-found"]}>Error: {error} </p>}
      {/* Empty state message when no data is available or a search has not been made */}
      {!selectedLocation && !isLoading && (
        <div>
          <h3>Search for a location</h3>
        </div>
      )}
      {/* Display weather data if it exists */}
      {selectedLocation && !isLoading && data && (
        <>
          <div className={styles["weather__location"]}>
            <MapPinned size={20} className={styles["icon"]} />
            <span>
              {data?.name}, {data?.sys?.country}
            </span>
          </div>
          <div className={styles["weather__info"]}>
            <img src={weatherImage} alt={data?.weather?.description} />
            <div className={styles["weather__type"]}>
              {/* {data?.weather?.map((type, index) => (
                <span key={index}>{type.description}</span>
              ))} */}
              <span>{data?.weather?.[0]?.main || "N/A"}</span>
            </div>
            <span className={styles["weather__temp"]}>
              {Number(data?.main?.temp).toFixed(0)}&deg;
            </span>
          </div>
          <div className={styles["weather__date"]}>
            <p>
              {data?.timezone
                ? `${getTodaysDate(data.timezone)}, ${getTimeInTimezone(
                    data.timezone
                  )}`
                : "N/A"}
            </p>
          </div>
          <div className={styles["weather__data"]}>
            <div className={styles["weather__data-item"]}>
              <span className={styles["weather__data-name"]}>Wind</span>
              <Wind className={styles["weather__data-icon"]} />
              <span className={styles["weather__data-value"]}>
                {Number(data?.wind?.speed).toFixed(0)} km/h
              </span>
            </div>
            <div className={styles["weather__data-item"]}>
              <span className={styles["weather__data-name"]}>Humidity</span>
              <Droplet className={styles["weather__data-icon"]} />
              <span className={styles["weather__data-value"]}>
                {data?.main?.humidity} %
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LocationLayout;
