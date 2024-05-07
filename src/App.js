import React from "react";
import "./App.css";
import WeatherData from "./components/WeatherData";

function App() {
  const [location, setLocation] = React.useState("");
  const [showWeatherData, setShowWeatherData] = React.useState(false);
  const [forecast, setForecast] = React.useState([]);

  React.useEffect(() => apiCall(), [location]);

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function apiCall() {
    const apiKey = "0f23024ee3934277b83113541240504";
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=5&q=${location}&aqi=0`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data));
  }

  function handleSubmit() {
    setShowWeatherData(true);
  }

  return (
    <div className="App">
      {showWeatherData ? (
        <div>
          <WeatherData
            location={location}
            forecast={forecast}
            setForecast={setForecast}
            showWeatherData={showWeatherData}
          />
        </div>
      ) : (
        <div className="App">
          <div className="welcome-page">
            <header className="App-header">
              <p className="title">
                Which location would you like to know the weather for?
              </p>
              <div className="input-and-submit">
                <input
                  className="town-input"
                  placeholder="Town/City"
                  onChange={handleLocationChange}
                />
                <button className="submit-btn" onClick={handleSubmit}>
                  Check the weather!
                </button>
              </div>
            </header>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
