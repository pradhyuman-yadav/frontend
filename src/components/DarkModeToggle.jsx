import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDarkMode}
      title={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDarkMode ? (
        // Sun
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
        </svg>
      ) : (
        // Moon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
