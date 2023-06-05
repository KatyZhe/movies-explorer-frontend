import React, { useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import "./Navigation.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import image from "../../images/acc-button-man.svg";
import blackimage from "../../images/blackimage.svg";

const classNames = require('classnames');

const Navigation = ({ loggedIn, isWhite = false }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };
  const routeMatch = useResolvedPath();

  return (
    <nav className={classNames('navigation', {navigation_white: isWhite})}>
      {!loggedIn ? (
        <div className="navigation__auth">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__button">Войти</button>
          </Link>
        </div>
      ) : (window.location.pathname === "/") ? (
        <>
          <div className="navigation__movies">
            <Link
              to="/movies"
              className={
                routeMatch.path === "/movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                routeMatch.path === "/saved-movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button className="navigation__button_account">
                <img
                  src={image}
                  alt="Иконка кнопки аккаунт"
                  className="navigation__button-image"
                />
                Аккаунт
              </button>
            </Link>
          </div>
        </>
      ) : (<>
        <div className="navigation__movies">
          <Link
            to="/movies"
            className={
              routeMatch.path === "/movies"
                ? "navigation__movies-link_active_white"
                : "navigation__movies-link_white"
            }
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className={
              routeMatch.path === "/saved-movies"
                ? "navigation__movies-link_active_white"
                : "navigation__movies-link_white"
            }
          >
            Сохранённые фильмы
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <button className="navigation__button_account_white">
              Аккаунт
              <img
                src={blackimage}
                alt="Иконка кнопки аккаунт"
                className="navigation__button-image_white"
              />
            </button>
          </Link>
        </div>
      </>)}
      {!isBurgerMenuOpen && loggedIn ? (
        <button className="burger__button" onClick={toggleBurgerMenu} />
      ) : (
        <BurgerMenu onClose={toggleBurgerMenu} />
      )}
    </nav>
  );
};

export default Navigation;
