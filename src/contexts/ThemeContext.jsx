import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Provider and its hook live together by convention. Only costs a full reload
// instead of a hot update when this file is edited in dev.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'theme';

// Browser chrome colours, kept in sync with --bg in App.css.
const CHROME = { light: '#FBFBFA', dark: '#0C0C0D' };

/**
 * Reads the stored preference, falling back to the OS setting.
 * Storage can throw (private mode, blocked cookies) so every access is guarded.
 */
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved === 'dark';
  } catch {
    // Storage unavailable — fall through to the system preference.
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    // Kept for the DC Metro iframe handshake, which reads data-dark.
    document.documentElement.setAttribute('data-dark', isDarkMode ? '1' : '0');

    // Match the browser UI (address bar, scrollbars) to the page.
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((tag) => tag.setAttribute('content', CHROME[theme]));

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Preference just won't persist; the UI still works.
    }
  }, [isDarkMode]);

  // Follow the OS if the user has never made an explicit choice.
  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Treat unreadable storage as "no explicit choice".
    }
    if (stored) return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setIsDarkMode(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
