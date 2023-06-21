import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ isLoading=false, isLiked, films }) => {
  return (
    <section className='cards'>
      {isLoading ? <Preloader /> : (
      <ul className='cards__list'>
        {films.map((film) => {
          return <MoviesCard key={film.id} movie={film} isLiked={isLiked} />
        })}
      </ul>
      )}
    </section>
  )
};

export default MoviesCardList;