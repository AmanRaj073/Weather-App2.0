import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

export function useGlobalContext() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState("");

  const resData = async (searchValue) => {
    try {
      let apiKey = "1638e4f180e75a092aabc98159c5a093";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`;
      
      setLoading("Fetching Weather Details");
      const { data } = await axios.get(apiUrl);
      setWeatherData(data);
      setLoading("");
      setError("");
      console.log(data);
      return data;
    } catch (error) {
      setError(`${searchValue} ${error?.response?.data?.message}`);
    }
  };

  const contextValue = {
    error,
    setError,
    loading,
    setLoading,
    resData,
    weatherData,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
