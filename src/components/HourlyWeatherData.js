import React from "react";
import "./WeatherData.css";

export default function WeatherData({ forecast, indexOfClicked }) {
  const forecastHours = forecast.forecast.forecastday[indexOfClicked].hour;
  console.log(forecastHours);

  function mapForecastHours() {
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

  return <div>{mapForecastHours()}</div>;
}
