import { Link } from 'react-router-dom';

// Self-hosted services. These are infrastructure links, kept out of the primary
// navigation so the top bar stays a single line.
const SERVICES = [
  { href: 'https://home.thepk.in', label: 'Dashboard' },
  { href: 'https://portainer.thepk.in', label: 'Portainer' },
  { href: 'https://squidex.thepk.in', label: 'Squidex' },
  { href: 'https://n8n.thepk.in', label: 'n8n' },
  { href: 'https://excalidraw.thepk.in', label: 'Excalidraw' },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">
      <p>
        &copy; {new Date().getFullYear()} Pradhyuman Yadav
      </p>

      <nav className="footer-links" aria-label="Self-hosted services">
        {SERVICES.map(({ href, label }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </nav>

      <nav className="footer-links" aria-label="Secondary">
        <Link to="/pipeline">Pipeline</Link>
        <Link to="/dc-metro">DC Metro</Link>
        <Link to="/llm-chat">AI Chat</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
