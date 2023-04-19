import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const TopTrendingContext = createContext<any>(null);

const TopTrendingProvider = ({ children }: any) => {
  const [listTrending, setListTrending] = useState([]);
  useEffect(() => {
    let controller: AbortController = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series`,
        {
          signal: controller.signal,
        }
      );

      setListTrending(response.data.series);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);
  const value = { listTrending };
  return (
    <TopTrendingContext.Provider value={value}>
      {children}
    </TopTrendingContext.Provider>
  );
};

export default TopTrendingProvider;
