import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import DarkModeToggle from './DarkModeToggle';
import Footer from './Footer';
import { Toaster } from './Toast';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile sheet on navigation.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // Close on Escape so the sheet is dismissible from the keyboard.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="layout">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-nav">
        <div className="site-nav-inner">
          <Link to="/" className="nav-brand">
            Pradhyuman Yadav
          </Link>

          <div className={`nav-sheet ${isMenuOpen ? 'active' : ''}`} id="nav-sheet">
            <Navigation onNavigate={() => setIsMenuOpen(false)} />
          </div>

          <div className="nav-actions">
            <DarkModeToggle />
          </div>

          <button
            type="button"
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-sheet"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main className="main-content" id="main">
        {children}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
