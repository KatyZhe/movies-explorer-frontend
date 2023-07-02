import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";

const SavedMovies = ({ isLoggedIn }) => {
  const [films, setFilms] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState("");
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);

  const mainApi = new MainApi({
    url: "https://api.katyzhe.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

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
    setErrorText("");
    setPreloader(true);
    try {
      const data = films;
      let filterData = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );

      if (tumbler)
        filterData = filterData.filter(({ duration }) => duration <= 40);
      setFilmsShowed(filterData);
    } catch (err) {
      setErrorText("Фильм невозможно созранить в избранном");
      setFilms([]);
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(film, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovies(film._id);
        const savedMovies = JSON.parse(localStorage.getItem('savedFilms'));
        const newSaved = savedMovies.filter((element) => {
          return element._id !== film._id;
        })
        setFilmsShowed(newSaved);
        setFilms(newSaved);
        localStorage.setItem('savedFilms', JSON.stringify(newSaved));
      } catch (err) {
        setErrorText("Невозможно удалить фильм из избранного");
      }
    }
  }

  useEffect(() => {
    const localStorageFilms = localStorage.getItem("savedFilms");
    if (localStorageFilms) {
      setFilms(JSON.parse(localStorageFilms));
      setFilmsShowed(JSON.parse(localStorageFilms));
      const localStorageFilmsTumbler =
        localStorage.getItem("savedFilmsTumbler");

      if (localStorageFilmsTumbler) {
        setFilmsTumbler(localStorageFilmsTumbler === "true");
      }
    } else {
      try {
        mainApi.getFavorite().then((data) => {
          setFilms(data);
          const spliceData = data.slice(0, MoviesCount[0]);
          setFilmsShowed(spliceData);
        });
      } catch (err) {
        setErrorText("Сервер не отвечает. Попробуйте позднее");
      }
    }
  }, []);

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener("resize", handlerResize);

    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      1200: [12, 3],
      900: [9, 3],
      768: [8, 2],
      320: [5, 5],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const sliceFilms = films;
    const newFilmsShowed = filmsShowed.concat(
      sliceFilms.slice(filmsShowed.length, MoviesCount[1] + filmsShowed.length)
    );
    setFilmsShowed(newFilmsShowed);
  }

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        handleGetMovies={handleGetMovies}
        filmsTumbler={filmsTumbler}
        filmsInputSearch={filmsInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      <MoviesCardList
        filmsRemains={[]}
        savedMoviesToggle={savedMoviesToggle}
        films={filmsShowed}
      />
      <Footer />
    </section>
  );
};

export default SavedMovies;
