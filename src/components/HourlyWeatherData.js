import React from "react";
import "./HourlyWeatherData.css";

export default function WeatherData({ forecast, indexOfClicked }) {
  const forecastHours = forecast.forecast.forecastday[indexOfClicked].hour;

  function mapForecastHours() {
    return forecastHours.map((hour, index) => {
      const date = new Date(hour.time);
      return (
        <div className={`hourly-forecast-card`} key={index}>
          <div className={`forecast-${index}`}>
            <div className="time">
              <p>
                {date
                  .toString()
                  .split(" ")
                  .splice(4)[0]
                  .split(":")
                  .splice(0, 2)
                  .join(":")}
              </p>
            </div>
            <div className="section--1">
              <div className="condition">{hour.condition.text}</div>
              <img
                src="//cdn.weatherapi.com/weather/64x64/night/113.png"
                alt="condition-icon"
              />
              <div className="temp">{hour.temp_c} °C</div>
            </div>
            <div className="feels-like-temp">
              Feels like {hour.feelslike_c} °C
            </div>
            <div className="humidity">Humidity: {hour.humidity}%</div>
            <div className="precipitation-percentage">
              {hour.chance_of_rain}% chance of rain
            </div>
            <div className="wind">
              Wind: {hour.wind_dir} at {hour.wind_mph} mph
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <p>{forecast.forecast.forecastday.date}</p>
      <div className="forecast-cards">{mapForecastHours()}</div>
    </div>
  );
}
