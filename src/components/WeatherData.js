import React from "react";
import "./WeatherData.css";
export default function WeatherData({
  location,
  forecast,
  setForecast,
  showWeatherData,
}) {
  const [isHourlyForecast, setIsHourlyForecast] = React.useState(false);
  const [indexOfClicked, setIndexOfClicked] = React.useState();
  const forecastLocation = forecast.location.name;

  function mapHourlyForecast() {
    const forecastHours = forecast.forecast.forecastday[indexOfClicked].hour;
    console.log(forecastHours);

    return forecastHours.map((hour, index) => {
      const date = new Date(hour.time);
      return (
        <div className="hourly-forecast-card" key={index}>
          <div className={`forecast-${hour}`}>
            <div className="time">
              <h6>
                {date
                  .toString()
                  .split(" ")
                  .splice(4)[0]
                  .split(":")
                  .splice(0, 2)
                  .join(":")}
              </h6>
            </div>
          </div>
        </div>
      );
    });
  }

  function toggleForecast(index) {
    setIndexOfClicked(index);
    setIsHourlyForecast((oldState) => {
      return !oldState;
    });
  }

  function mapForecast() {
    const forecastDays = forecast.forecast.forecastday;
    return forecastDays.map((day, index) => {
      const date = new Date(day.date);
      return (
        <div
          className="forecast-card"
          key={index}
          onClick={() => toggleForecast(index)}
        >
          <div className="section--1">
            <h5>{date.toString().split(" ").splice(0, 3).join(" ")}</h5>
          </div>
          <div className="section--2">
            <div>{day.day.condition.text}</div>
            <img
              src="//cdn.weatherapi.com/weather/64x64/day/176.png"
              alt="weather-icon"
              className="weather-icon"
            />
            <div className="avg-temp">average {day.day.avgtemp_c} °C</div>
            <div className="max-temp">going up to {day.day.maxtemp_c} °C</div>
            <div className="min-temp">as low as {day.day.mintemp_c} °C</div>
          </div>
          <div className="section--3">
            <div className="sun">
              <img
                src={require("./../util/sunrise.png")}
                alt="sunrise-icon"
                className="sun--rise-icon"
              />
              <div className="sun--rise">{day.astro.sunrise}</div>
            </div>

            <div className="sun">
              <img
                src={require("./../util/sunset.png")}
                alt="sunset-icon"
                className="sun--set-icon"
              />
              <div className="sun--set">{day.astro.sunset}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="weather-data">
      <div className="page-title">The weather in {forecastLocation}:</div>
      <div className="forecasts">
        {!isHourlyForecast ? mapForecast() : mapHourlyForecast()}
      </div>
    </div>
  );
}
