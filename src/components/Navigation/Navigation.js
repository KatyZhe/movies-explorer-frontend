import React, { useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = ({ loggedIn }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const routeMatch = useResolvedPath();

  return (
    <nav className="navigation">
      {loggedIn ? (
        <>
          <div className="navigation__movies">
            <Link
              to="/movies"
              className={
                routeMatch.pathname === "/movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                routeMatch.pathname === "/saved-movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button className="navigation__button_account">Аккаунт</button>
            </Link>
          </div>
          {!isBurgerMenuOpen && loggedIn ? (
            <button className="burger__button" onClick={toggleBurgerMenu} />
          ) : (
            <BurgerMenu onClose={toggleBurgerMenu} />
          )}
        </>
      ) : (
        <div className="navigation__auth">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__button">Войти</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
