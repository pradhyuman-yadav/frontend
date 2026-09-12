import React from 'react';

/**
 * Catches render-time errors so a single bad value (an unparseable date, a
 * malformed CMS payload) degrades to a readable message instead of a blank page.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="notfound-page">
        <p className="eyebrow">Something broke</p>
        <h1>This page failed to render</h1>
        <p className="page-subtitle">
          The error has been logged to the console. Reloading usually clears it.
        </p>
        <div className="notfound-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
          <a className="btn" href="/">
            Go Home
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
