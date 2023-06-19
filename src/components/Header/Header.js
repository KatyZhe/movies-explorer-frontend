import "./Header.css";
import { Link, useMatch } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/header-logo.svg"

const Header = ({ isLoggedIn }) => {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const logRegURL =
    href.pathnameBase === "/signin" ||
    href.pathnameBase === "/signup" ||
    href.pathnameBase === "/notfound";

  function renderHeaderStyles() {
    if (logRegURL) {
      return (<header style={{ display: "none" }}></header>);
    } else {
      return(
        <header className="header">
        <Link to="/" className="header__link">
          <img src={logo} alt="логотип заголовка" className="header__logo" />
        </Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </header>
      );
    }
  }
  return renderHeaderStyles();
};

export default Header;
