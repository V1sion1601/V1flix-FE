import React, { useState, createContext } from "react";
//Context
export const ThemeContext = createContext<any>("");
//Provider
const ThemeProvider: React.FC<any> = ({ children }) => {
  //Init state
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = { theme, toggleTheme };
  //this will have account context
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
