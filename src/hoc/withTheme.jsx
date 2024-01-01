import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const withTheme = (WrappedComponent) => {
  const WithTheme = (props) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return <WrappedComponent theme={theme} toggleTheme={toggleTheme} {...props} />;
  };

  return WithTheme;
};

export default withTheme;
