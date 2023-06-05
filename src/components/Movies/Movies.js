import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Footer from '../Footer/Footer';
import movie1 from '../../images/movie1.svg';
import movie2 from '../../images/movie2.svg';
import movie3 from '../../images/movie3.svg';
import movie4 from '../../images/movie4.svg';
import movie5 from '../../images/movie5.svg';

const movies = [
  {
    id: '1',
    name: '33 слова о дизайне',
    image: movie1,
    duration: '1ч 00м',
    liked: false
  },
  {
    id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    image: movie2,
    duration: '1ч 00м',
    liked: true
  },
  {
    id: '3',
    name: 'В погоне за Бенкси',
    image: movie3,
    duration: '1ч 00м',
    liked: false
  },
  {
    id: '4',
    name: 'Баския: Взрыв реальности',
    image: movie4,
    duration: '1ч 00м',
    liked: false
  },
  {
    id: '5',
    name: 'Бег это свобода',
    image: movie5,
    duration: '1ч 00м',
    liked: true
  },
];

const Movies = ({ loggedIn }) => {
    return (
      <section>
        <Header loggedIn={loggedIn} />
        <SearchForm />
        <MoviesCardList isLiked={false} movies={movies} />
        <More />
        <Footer />
      </section>
    )
  };
  
  export default Movies;