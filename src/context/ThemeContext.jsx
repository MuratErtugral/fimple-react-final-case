/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light" );

  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem('theme', 'dark');
      setTheme("dark");
    } else {
      setTheme("light");
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect (() => {
    if(theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);
  
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

