import { createContext, useContext, useState } from "react";

// 1. Create a context
const GlobalContext = createContext();

// 2. Create the provider component
function GlobalProvider({ children }) {
  // 2a. State
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  // 2b. Methods to update state
  const updateSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(null);
  };

  const addFavoriteLocation = (location) => {
    setFavoriteLocations([...favoriteLocations, location]);
  };

  const removeFavoriteLocation = (location) => {
    setFavoriteLocations(
      favoriteLocations.filter((fav) => fav.id !== location.id)
    );
  };

  // 2c. Context value will be supplied to consumers of this context
  const contextValue = {
    selectedLocation,
    favoriteLocations,
    updateSelectedLocation,
    clearSelectedLocation,
    addFavoriteLocation,
    removeFavoriteLocation,
  };

  // 2d. Return the provider component
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

// 3. Create a custom hook to consume the context
function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalProvider component"
    );
  }
  return context;
}

// 4. Export the provider and custom hook
export { GlobalProvider, useGlobalContext };
