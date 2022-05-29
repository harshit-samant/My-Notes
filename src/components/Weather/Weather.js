import React, { useState, useEffect, useCallback } from "react";
import "./Weather.css";

const weatherAPI = {
  key: "e4a6985b0b5f3d004724386087d80863",
  // key: "f1dc56e4d3b6fcf093246c3ea9170392",
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
};

const Weather = () => {
  const city = "BHIMTAL";
  const [enteredCity, setEnteredCity] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value.toUpperCase());
    setError(null);
  };

  const fetchWeatherHandler = useCallback(async (city) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const w = data.wind.speed;
      const value1 = w * 3.6;

      setWeather({
        name: `${data.name}, ${data.sys.country}`.toUpperCase(),
        temp: `${Math.round(data.main.temp)}°C`,
        minMax: `Min ${Math.floor(
          data.main.temp_min - 1.75
        )}°C | Max ${Math.ceil(data.main.temp_max + 1)}°C`,
        textContent: `${data.weather[0].main}(${data.weather[0].description})`,
        wind: `${value1.toFixed(1)}Kmph`,
        humidity: `${data.main.humidity}%`,
        pressure: `${(data.main.pressure / 100).toFixed(1)}Pa`,
        src: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
      });

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchWeatherHandler(city);
  }, [fetchWeatherHandler]);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetchWeatherHandler(enteredCity);
    console.log(weather);
  };

  const loading = (
    <div className="loading">
      <p>...Loading</p>
    </div>
  );

  const errorSection = (
    <div className="error">
      <p>{error}</p>
    </div>
  );

  return (
    <React.Fragment>
      <div className="weather">
        <div className="container">
          <form className="search" onSubmit={submitHandler}>
            <input type="text" onChange={cityChangeHandler} />
            <button type="submit">Change</button>
          </form>
          {isLoading && !error && loading}
          {error && errorSection}
          <div className="city-container">
            <div className="city">
              <h3>{weather.name ? weather.name : "----, --"}</h3>
              <div className="icon-container">
                <img className="icon" src={weather.src} alt="icon"></img>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="other-info">
                <p>{weather.minMax}</p>
                <p>{weather.textContent}</p>
              </div>
            </div>
            <div className="col">
              <div className="temp">
                <p>{weather.temp}</p>
              </div>
            </div>
          </div>
          <div className="rowBottom">
            <div className="col2">
              <img
                title="Wind Speed"
                src="./icons/wind.png"
                alt="Wind Speed"
              ></img>
              <p>{weather.wind ? weather.wind : "--"}</p>
            </div>
            <div className="col2">
              <img
                title="Humidity"
                src="./icons/humidity.png"
                alt="Humidity"
              ></img>
              <p>{weather.humidity ? weather.humidity : "--"}</p>
            </div>
            <div className="col2">
              <img
                title="Longitude"
                src="./icons/longitude.png"
                alt="Longitude"
              ></img>
              <p>{weather.longitude ? weather.longitude : "--"}</p>
            </div>
            <div className="col2">
              <img
                title="Latitude"
                src="./icons/latitude.png"
                alt="Latitude"
              ></img>
              <p>{weather.latitude ? weather.latitude : "--"}</p>
            </div>
            <div className="col2">
              <img
                title="Ground Pressure"
                src="./icons/pressure-gauge.png"
                alt="Ground Pressure"
              ></img>
              <p>{weather.pressure ? weather.pressure : "--"}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Weather;
