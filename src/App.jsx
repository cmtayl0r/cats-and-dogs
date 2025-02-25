import LocationLayout from "./components/layout/LocationLayout";
import SearchLayout from "./components/layout/SearchLayout";

function App() {
  return (
    <div className="container">
      <div className="weather-display">
        <SearchLayout />
        <LocationLayout />
      </div>
    </div>
  );
}

export default App;
