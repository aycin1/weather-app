import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function SearchBar({ setForecast }) {
  const [locationOptions, setLocationOptions] = React.useState();

  function refineLocation(location) {
    if (location.length > 2) {
      async function locationApiCall() {
        const apiKey = "0f23024ee3934277b83113541240504";
        const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`;
        const response = await fetch(url);
        return response.json();
      }

      locationApiCall()
        .then((data) => {
          setLocationOptions(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function forecastForLocation(locationId) {
    if (locationId) {
      async function forecastApiCall() {
        const apiKey = "0f23024ee3934277b83113541240504";
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=id:${locationId}&days=5&aqi=0&alerts=0`;
        const response = await fetch(url);
        return response.json();
      }

      forecastApiCall()
        .then((data) => {
          setForecast(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function mapLocationOptions(apiResponse) {
    let mappedLocationOptions;
    try {
      mappedLocationOptions = apiResponse.map((loc, i) => {
        return (
          <Dropdown.Item
            key={i}
            href={`${i} + ${loc.id}`}
            onClick={(e) => {
              e.preventDefault();
              forecastForLocation(loc.id);
            }}
          >
            {`${loc.name}, ${loc.country}`}
          </Dropdown.Item>
        );
      });
    } catch (error) {}
    return mappedLocationOptions;
  }

  return (
    <div className="welcome-page">
      <p className="title">
        Which location would you like to know the weather for?
      </p>
      <div className="input-and-submit">
        <Dropdown container="body">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <input
              className="town-input"
              placeholder="Town/City"
              onChange={(e) => refineLocation(e.target.value)}
            />
          </Dropdown.Toggle>
          {mapLocationOptions(locationOptions)}
        </Dropdown>
      </div>
    </div>
  );
}
