// context < API ></>
// useContext hooks

// context(Warehouse)
// provider => Delivery Boy / Delivery Girl
// consumer / (usecContext(Aap khud hi ho (you)))

import React, { createContext, useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// 27022cb3

const AppContext = createContext();

// we need to create provider function

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
            show: false,
            msg: "",
        });
        setMovies(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider
      value={{ isLoading, isError, movies, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

// create global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
