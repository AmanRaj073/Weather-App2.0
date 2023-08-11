import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../GetLocation/getLocation";
import SyncLoader from "react-spinners/SyncLoader";
const Home = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorLens, setErrorLens] = useState("");
  const navigate = useNavigate();

  function handleSearch(data) {
    navigate("/card", { state: data });
  }

  //------ Search by pressing Enter -----
  const handleKeyPress = (event) => {
    setLoading(true);

    if (event.key === "Enter") {
      handleSearch(search);
    }
  };

  //------ Get Location by Button ------
  async function handlegetlocation() {
    setErrorLens("Fetching Location ...");
    setLoading(true);
    let res = await getLocation();
    console.log(res?.city);
    if (res?.city) {
      handleSearch(res?.city);
      setErrorLens("");
    } else {
      // setLoading(false);
      setErrorLens(res?.message);
      console.log(errorLens);
    }
  }

  return (
    <div className="boxer">
      <div className="heading">
        <span>Weather App</span>
        <hr />
      </div>
      {loading ? (
        <>
          <div className="searchbox">
            <input
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter City Name"
            />
            <span>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ or ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ </span>
            {errorLens && <span>{errorLens}</span>}
            <button onClick={handlegetlocation}>Get Device Location</button>
          </div>
        </>
      ) : (
        <>
          <div className="skeleton">
            <h4>
              Fetching Device Location
              <SyncLoader />
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
