import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/useContext";
import { GetLocation } from "../../Helper/GetLocation";

const Home = () => {
  const { setError, resData, error, loading, setLoading } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setError("");
      const res = await resData(searchValue);
      if (res) {
        navigate("/card");
        setError("");
      } else {
        setLoading("");
        // setError(error.message)
        // setError(`${searchValue} City Doesn't Exist`);
      }
    }
  };

  async function handleGetLocation() {
    setError("");
    setLoading("Getting Device Location");
    const res = await GetLocation();
    setLoading("");

    if (res?.city) {
      await resData(res.city);
      navigate("/card");
      setError("");
    } else {
      setError(res?.message);
    }
  }

  return (
    <div className="wrapper">
      <header>Weather App</header>
      <section className="input-part">
        {loading && <p className="info-txt pending">{loading}</p>}
        {error && <p className="info-txt error">{error}</p>}
        <input
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="Enter City Name"
        />
        <div className="separator"></div>
        <button onClick={handleGetLocation}>Get Device Location</button>
      </section>
    </div>
  );
};

export default Home;
