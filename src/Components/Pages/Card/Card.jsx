import React, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import clear from "./Weather-Icons/clear.svg";
import cloud from "./Weather-Icons/cloud.svg";
import haze from "./Weather-Icons/haze.svg";
import rain from "./Weather-Icons/rain.svg";
import snow from "./Weather-Icons/snow.svg";
import storm from "./Weather-Icons/storm.svg";
import { useGlobalContext } from "../../Context/useContext";

const Card = () => {
  const { weatherData } = useGlobalContext();
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    if (weatherData) {
      const id = weatherData?.weather[0]?.id;
      if (id) {
        if (id >= 200 && id <= 232) {
          setImg(storm);
        } else if (id >= 600 && id <= 622) {
          setImg(snow);
        } else if (id >= 701 && id <= 781) {
          setImg(haze);
        } else if (id >= 801 && id <= 804) {
          setImg(cloud);
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
          setImg(rain);
        } else {
          setImg(clear);
        }
      }
    }
  }, [weatherData]);

  const { main, name, sys } = weatherData || {};
  const temperature = Math.floor(Number(main?.temp) - 273);
  const feelsLike = Math.floor(Number(main?.feels_like) - 273);
  const humidity = main?.humidity;

  return (
    <div className="wrapper">
      <header>
        <i className='bx bx-left-arrow-alt' onClick={() => navigate("/")} />Weather App
      </header>
      <section className="weather-part">
        {img && <img src={img} alt="Weather Icon" />}
        <div className="temp">
          <span className="numb">{temperature}</span>
          <span className="deg">°</span>C
        </div>
        <div className="weather">{weatherData?.weather[0]?.description}</div>
        <div className="location">
          <i className="bx bx-map" />
          <span>{name}, {sys?.country}</span>
        </div>
        <div className="bottom-details">
          <div className="column feels">
            <i className="bx bxs-thermometer" />
            <div className="details">
              <div className="temp">
                <span className="numb-2">{feelsLike}</span>
                <span className="deg">°</span>C
              </div>
              <p>Feels like</p>
            </div>
          </div>
          <div className="column humidity">
            <i className="bx bxs-droplet-half" />
            <div className="details">
              <span>{humidity}%</span>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
