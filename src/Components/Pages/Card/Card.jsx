import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { CiLocationOn, CiTempHigh } from "react-icons/ci";
import { BsDropletHalf } from "react-icons/bs";
import { MdWifiTetheringError } from "react-icons/md";
import clear from "./Weather-Icons/clear.svg";
import cloud from "./Weather-Icons/cloud.svg";
import haze from "./Weather-Icons/haze.svg";
import rain from "./Weather-Icons/rain.svg";
import snow from "./Weather-Icons/snow.svg";
import storm from "./Weather-Icons/storm.svg";

const Card = () => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("");
  const [img, setImg] = useState("");
  const location = useLocation();
  const inputValue = location.state;
  const navigate = useNavigate();

  let apiKey = "1638e4f180e75a092aabc98159c5a093";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

  const resData = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setWeatherData(data);

      let id = data?.weather[0]?.id;
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
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log("Error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    resData();
  }, [inputValue]);
  return (
    <div className="main">
      <div className="header">
        <p className="headingof">
          <span>
            <BiArrowBack onClick={() => navigate("/")} />
          </span>{" "}
          Weather App
        </p>
        <hr />
      </div>
      {weatherData ? (
        <>
          <div className="info">
            <div>
            <img
              src={img}
              alt="weather"
            />
            </div>
            <div></div>
            <span className="temp">
              {Math.floor(Number(weatherData?.main?.temp) - 273)}°C
            </span>
            <br />
            <div className="cloud-address">
              <span>{weatherData?.weather[0]?.description.toUpperCase()}</span>
              <br/>
              <span className="local">
                <span>
                  <CiLocationOn />
                </span>{" "}
                {weatherData?.name}, {weatherData?.sys?.country}
              </span>
            </div>
          </div>
          {/* <hr/> */}
          <div className="bottomBox">
            <div className="leftbox btmBoxes">
              <div>
                <CiTempHigh style={{ fontSize: "35", color: "#00a0c1" }} />
              </div>
              <div>
                <span className="temp_feel">
                  {Math.floor(Number(weatherData?.main?.feels_like) - 273)}°C{" "}
                </span>
                <br />
                <span id="feels_like">Feels Like</span>{" "}
              </div>
            </div>
            <div className="rightbox btmBoxes">
              <div>
                <BsDropletHalf style={{ fontSize: "35", color: "#00a0c1" }} />
              </div>
              <div>
                <span className="temp_feel">
                  {weatherData?.main?.humidity}%
                </span>
                <br />
                <span id="feels_like">Humidity</span>{" "}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h4 style={{ textAlign: "center", paddingBottom: "42px" }}>
            <MdWifiTetheringError style={{ fontSize: "30px" }} />{" "}
            {error.toUpperCase()}
          </h4>
        </>
      )}
    </div>
  );
};

export default Card;
