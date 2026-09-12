import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound-page">
    <p className="notfound-code">404</p>
    <h1>This page does not exist</h1>
    <p className="page-subtitle">
      The link may be out of date, or the page may have moved.
    </p>
    <div className="notfound-actions">
      <Link className="btn btn-primary" to="/">
        Go Home
      </Link>
      <Link className="btn" to="/articles">
        Browse Writing
      </Link>
    </div>
  </div>
);

export default NotFound;
