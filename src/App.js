import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherData from "./components/WeatherData";

function App() {
  const [forecast, setForecast] = React.useState();
  function showWeatherData() {
    if (forecast !== undefined) {
      return <WeatherData forecast={forecast} />;
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <SearchBar setForecast={setForecast} />
      </div>
      <div className="App-weather">{showWeatherData()}</div>
    </div>
  );
}

export default App;
