import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import More from '../More/More';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

const SavedMovies = ({ isLoggedIn }) => {

  const [films, setFilms] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setFilmsShowedWithTumbler(filmsShowed);
      setFilmsWithTumbler(films);
      filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
      filterData = films.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = filmsShowedWithTumbler;
      filterData = filmsWithTumbler;
    }
    setFilmsShowed(filterDataShowed);
    setFilms(filterData);
  }


  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText('');
    setPreloader(true);
    try {
      const data = films;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);
      setFilmsShowed(filterData);
    } catch (err) {
      setErrorText('Фильм невозможно созранить в избранном');
      setFilms([]);

    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(film, favorite) {
    if (!favorite) {
      try {
        await moviesApi.deleteMovies(film._id);
        const newFilms = await moviesApi.getMovies();
        setFilmsShowed(newFilms);
        setFilms(newFilms);
      } catch (err) {
        setErrorText('Невозможно удалить фильм из избранного');
      }
    }
  }

  useEffect(() => {
    const localStorageFilms = localStorage.getItem('savedFilms');
    if (localStorageFilms) {
      setFilms(JSON.parse(localStorageFilms));
      const localStorageFilmsTumbler = localStorage.getItem('savedFilmsTumbler');


      if (localStorageFilmsTumbler) {
        setFilmsTumbler(localStorageFilmsTumbler === 'true');
      }


    } else {
      try {
        const data = moviesApi.getMovies();
        setFilms(data);
        setFilmsShowed(data);
      } catch (err) {
        setErrorText('Сервер не отвечает. Попробуйте позднее');
      }
    }
  }, []);

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler}/>
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
      <More />
      <Footer />
    </section>
  )
};

export default SavedMovies;