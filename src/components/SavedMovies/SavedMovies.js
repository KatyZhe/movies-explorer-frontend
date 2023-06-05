import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Footer from '../Footer/Footer';

import movie2 from '../../images/movie2.svg';
import movie5 from '../../images/movie5.svg';

const savedMovies = [
  {
    id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    image: movie2,
    duration: '1ч 00м',
    saved: true
  },
  {
    id: '5',
    name: 'Бег это свобода',
    image: movie5,
    duration: '1ч 00м',
    saved: true
  },
];

const SavedMovies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={true} movies={savedMovies} />
      <More />
      <Footer />
    </section>
  )
};

export default SavedMovies;