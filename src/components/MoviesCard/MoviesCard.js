import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';

const MoviesCard = ({ movie, savedMoviesToggle, filmsSaved }) => {
  const { pathname } = useResolvedPath();
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteToogle() {
    const newFavorite = !favorite;
    const savedFilm = filmsSaved.filter((obj) => {
      return obj.movieId === movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedFilm.length > 0 ? savedFilm[0]._id : null }, newFavorite);
  }

  function handleFavoriteDelete() {
    savedMoviesToggle(movie, false);
  }

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedFilm = filmsSaved.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedFilm.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [pathname, filmsSaved, movie.id]);

  return (
    <li className="card">
      <div className="card__element">
        <div className="card_description">
          <p className="card__title">{movie.nameRU}</p>
          <p className="card__duration">{getMovieDuration(movie.duration)}</p>
        </div>
        <div className="card__buttons">
          {pathname === "/saved-movies" ? (
            <button
              type="button"
              className="card__button card__button_delete"
              onClick={handleFavoriteDelete}
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
      <a
        className="card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={pathname === '/saved-movies' ? `${movie.image}` :
          `https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
          className="card__image"
        ></img>
      </a>
    </li>
  );
};

export default MoviesCard;
