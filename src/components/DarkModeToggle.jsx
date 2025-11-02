import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;
