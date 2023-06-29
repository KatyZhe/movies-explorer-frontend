import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    isLoggedIn ? navigate(-2) : navigate('/');
  };

  return (
    <div className="notfound__container">
      <div className="notfound__block">
        <span className="notfound__status">404</span>
        <span className="notfound__text">Страница не найдена</span>
      </div>
      <button className="notfound__back" onClick={handleBack}>
        Назад
      </button>
    </div>
  );
};

export default NotFound;
