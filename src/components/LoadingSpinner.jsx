/**
 * Skeleton placeholder shaped like the page it replaces, so the layout does
 * not jump when the real content lands.
 */
const LoadingSpinner = () => (
  <div className="skeleton-stack" aria-busy="true" aria-label="Loading content">
    <div className="skeleton skeleton-card" style={{ height: '7rem', maxWidth: '28rem' }} />
    <div className="skeleton skeleton-line" style={{ maxWidth: '18rem' }} />
    <div className="skeleton skeleton-card" />
    <div className="skeleton skeleton-card" />
  </div>
);

export default LoadingSpinner;
