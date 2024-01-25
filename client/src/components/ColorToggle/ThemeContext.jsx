// ThemeContext.js
import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  
  useEffect(() => {
    const currentHour = new Date().getHours();
    // Set dark mode if it's night time (for example, after 6 PM and before 6 AM)
    setIsDarkMode(currentHour < 6 || currentHour >= 18);
  }, []);


  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
