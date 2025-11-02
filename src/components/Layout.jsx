import React from 'react';
import Navigation from './Navigation';
import DarkModeToggle from './DarkModeToggle';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="page-container">
        <header className="header">
          <h1 className="site-title">Pradhyuman</h1>
          <div className="header-controls">
            <Navigation />
            <DarkModeToggle />
          </div>
        </header>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
