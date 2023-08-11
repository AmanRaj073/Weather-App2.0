import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { CiLocationOn, CiTempHigh } from "react-icons/ci";
import { BsDropletHalf } from "react-icons/bs";
import { MdWifiTetheringError } from "react-icons/md";

const Card = () => {
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState("");
  const location = useLocation();
  const inputValue = location.state;
  const navigate = useNavigate();

  let apiKey = "1638e4f180e75a092aabc98159c5a093";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

  const resData = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setWeatherData(data);
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
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
              alt="weather"
            />
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
