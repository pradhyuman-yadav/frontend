import { NavLink } from 'react-router-dom';

/**
 * Primary navigation.
 *
 * Kept to three destinations so the bar renders on one line at every desktop
 * width. The project pages (AI Chat, Pipeline, DC Metro) are surfaced from the
 * home page's work grid, and the self-hosted service links live in the footer —
 * they are infrastructure, not portfolio navigation.
 */
const LINKS = [
  { to: '/articles', label: 'Writing' },
  { to: '/tools', label: 'Tools' },
  { to: '/about', label: 'About' },
];

const Navigation = ({ onNavigate }) => (
  <nav className="navigation" aria-label="Primary">
    {LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onNavigate}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {label}
      </NavLink>
    ))}
  </nav>
);

export default Navigation;
