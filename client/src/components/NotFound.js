import './NotFound.css';

function NotFound () {

  return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>404</h1>
        <h2>Sorry, the page you're trying to access doesn't exist</h2>
      </div>
      <div className="header-footer"></div>
    </div>
  );
}
export default NotFound;