import React, { createContext, useContext, useState } from 'react';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
