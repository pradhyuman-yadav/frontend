import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const p = location.pathname;

  const isActive = (path) => {
    if (path === '/') return p === '/';
    return p === path || p.startsWith(path + '/');
  };

  return (
    <nav className="navigation">
      <Link to="/" className={isActive('/') ? 'active' : ''}>
        Home
      </Link>
      <Link to="/articles" className={isActive('/articles') ? 'active' : ''}>
        Articles
      </Link>
      <Link to="/tools" className={isActive('/tools') ? 'active' : ''}>
        Tools
      </Link>
      <Link to="/about" className={isActive('/about') ? 'active' : ''}>
        About Me
      </Link>
      <Link to="/llm-chat" className={isActive('/llm-chat') ? 'active' : ''}>
        AI Chat (SLM)
      </Link>
      <Link to="/pipeline" className={isActive('/pipeline') ? 'active' : ''}>
        Pipeline
      </Link>
      <Link to="/dc-metro" className={isActive('/dc-metro') ? 'active' : ''}>
        DC Metro
      </Link>

      {/* External Services */}
      <div className="nav-divider"></div>

      <a href="https://home.thepk.in" className="nav-external-link" target="_blank" rel="noopener noreferrer">
        Dashboard
      </a>
      <a href="https://portainer.thepk.in" className="nav-external-link" target="_blank" rel="noopener noreferrer">
        Portainer
      </a>
      <a href="https://squidex.thepk.in" className="nav-external-link" target="_blank" rel="noopener noreferrer">
        Squidex
      </a>
      <a href="https://n8n.thepk.in" className="nav-external-link" target="_blank" rel="noopener noreferrer">
        n8n
      </a>
      <a href="https://excalidraw.thepk.in" className="nav-external-link" target="_blank" rel="noopener noreferrer">
        Excalidraw
      </a>
    </nav>
  );
};

export default Navigation;
