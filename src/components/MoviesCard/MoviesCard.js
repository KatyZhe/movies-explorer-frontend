import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

const MoviesCard = ({ movie }) => {
  const [favorite, setFavorite] = React.useState(false);

  function handleFavoriteToogle() {
    setFavorite(!favorite);
  }

  const { pathname } = useLocation();

  return (
    <li className="card">
      <div className="card__element">
        <div className="card_description">
          <p className="card__title">{movie.name}</p>
          <p className="card__duration">{movie.duration}</p>
        </div>
        <div className="card__buttons">
          {pathname === "/saved-movies" ? (
            <button
              type="button"
              className="card__button card__button_delete"
            />
          ) : (
            <button
              type="button"
              className={`card__button card__button${
                favorite ? "_active" : "_inactive"
              }`}
              onClick={handleFavoriteToogle}
            />
          )}
        </div>
      </div>
      <img src={movie.image} alt={movie.title} className="card__image"></img>
    </li>
  );
};

export default MoviesCard;
