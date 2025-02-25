// Import hooks
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

// Context
import { useGlobalContext } from "../../context/GlobalContext";

// Import dependencies
import { MapPinned, Wind, Droplet } from "lucide-react";
import loadingGif from "../../assets/images/loading.gif";
import sunny from "../../assets/images/sunny.png";
// import cloudy from "../../assets/images/cloudy.png";
// import rainy from "../../assets/images/rainy.png";
// import snowy from "../../assets/images/snowy.png";
import SkeletonMainData from "../ui/skeletons/SkeletonMainData";

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

  // TODO: Add favourite location to context
  // TODO: Remove favourite location from context

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <div>
          <img src={loadingGif} className={styles["loading"]} alt="loading" />
          <h1>Loading</h1>
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
            <img src={sunny} alt="sunny" />
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
          <SkeletonMainData />
        </>
      )}
    </>
  );
}

export default LocationLayout;
