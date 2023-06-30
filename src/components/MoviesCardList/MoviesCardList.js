import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

const MoviesCardList = ({ films, savedMoviesToggle, filmsSaved, filmsRemains, handleMore }) => {
  const { pathname } = useLocation();

  return (
    <section className="cards">
      {films.length > 0 ? (
        <ul className="cards__list">
          {films.map((film) => (
            <MoviesCard
              key={film.id || film.movieId}
              film={film}
              savedMoviesToggle={savedMoviesToggle}
              filmsSaved={filmsSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="cards__text">Ничего не найдено</div>
      )}

      {filmsRemains > 0 && pathname !== '/saved-movies' && (
        <More handleMore={handleMore}/>
      )}
    </section>
  );
};

export default MoviesCardList;