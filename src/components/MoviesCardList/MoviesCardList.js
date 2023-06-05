import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ isLoading=false, isLiked, movies }) => {
  return (
    <section className='cards'>
      {isLoading ? <Preloader /> : (
      <ul className='cards__list'>
        {movies.map((movie) => {
          return <MoviesCard key={movie.id} movie={movie} isLiked={isLiked} />
        })}
      </ul>
      )}
    </section>
  )
};

export default MoviesCardList;