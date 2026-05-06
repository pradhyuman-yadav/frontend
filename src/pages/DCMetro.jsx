import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DCMetro = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="dcmetro-page">
      <header className="page-header">
        <h1 className="page-title">DC Metro</h1>
        <p className="page-subtitle">Real-time Washington DC Metro transit information</p>
      </header>
      <div className="dcmetro-embed">
        <div className="dcmetro-toolbar">
          <a
            href="https://dc-metro.thepk.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="dcmetro-open-btn"
          >
            Open full screen ↗
          </a>
        </div>
        <iframe
          src="https://dc-metro.thepk.in/"
          title="DC Metro"
          className="dcmetro-iframe"
          allow="geolocation"
          style={isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : undefined}
        />
      </div>
    </div>
  );
};

export default DCMetro;
