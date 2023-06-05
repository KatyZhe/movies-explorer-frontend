import "./Header.css";
import { Link, useMatch } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn }) => {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootURL = href.pathnameBase === "/";
  const logRegURL = (href.pathnameBase === "/signin" || href.pathnameBase === "/signup");

  function renderHeaderStyles() {
    if (isRootURL) {
      return (
        <header className="header">
          <Link to="/" className="header__link">
            <div className="header__logo"></div>
          </Link>
          <Navigation loggedIn={loggedIn} />
        </header>
      );
    } else if (logRegURL) {
      <header style={{display:'none'}}></header>
    }
    return (
      <header className="header_white">
        <Link to="/" className="header__link">
          <div className="header__logo_white"></div>
        </Link>
        <Navigation loggedIn={true} />
      </header>
    );
  };
  return renderHeaderStyles();
};

export default Header;
