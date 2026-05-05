import React from 'react';

const DCMetro = () => {
  return (
    <div className="dcmetro-page">
      <header className="page-header">
        <h1 className="page-title">DC Metro</h1>
        <p className="page-subtitle">Real-time Washington DC Metro transit information</p>
      </header>
      <div className="dcmetro-embed">
        <iframe
          src="https://dc-metro.thepk.in/"
          title="DC Metro"
          className="dcmetro-iframe"
          allow="geolocation"
        />
      </div>
    </div>
  );
};

export default DCMetro;
