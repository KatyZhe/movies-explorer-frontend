import React, { useEffect, useState } from "react";
import './Movies.css';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Footer from "../Footer/Footer";

const Movies = ({ openPopup }) => {
  const [films, setFilms] = useState(null);
  const [filmsSaved, setFilmsSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState("");
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState(null);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

  const mainApi = new MainApi({
    url: "https://api.katyzhe.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener("resize", handlerResize);

    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []);

  /* Вывод карточек по нажатию кнопки Еще */

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
    const spliceFilms = films;
    const newFilmsShowed = filmsShowed.concat(
      spliceFilms.slice(
        filmsShowed.length,
        MoviesCount[1] + filmsShowed.length
      )
    );
    setFilmsShowed(newFilmsShowed);
  }

  /* Поиск фильмов */

  async function handleGetMovies(inputSearch) {
    setFilmsTumbler(false);
    localStorage.setItem("filmsTumbler", false);

    if (!inputSearch) {
      setErrorText("Нужно ввести ключевое слово");
      return false;
    }

    setErrorText("");
    setPreloader(true);

    try {
      const data = await moviesApi.getMovies();
      let filterData = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );
      localStorage.setItem("films", JSON.stringify(filterData));
      localStorage.setItem("filmsInputSearch", inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);
      setFilmsShowed(spliceData);
      setFilms(filterData);
      setFilmsShowedWithTumbler(spliceData);
      setFilmsWithTumbler(filterData);
    } catch (err) {
      setErrorText(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );

      setFilms([]);
      localStorage.removeItem("films");
      localStorage.removeItem("filmsTumbler");
      localStorage.removeItem("filmsInputSearch");
    } finally {
      setPreloader(false);
    }
  }

  /* Короткометражки */

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

  /* Добавление в сохраненные фильмы */

  async function savedMoviesToggle(film, favorite) {
    if (favorite) {
      const objFilm = {
        image: "https://api.nomoreparties.co" + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + film.image.url,
        movieId: film.id,
        country: film.country || "Неизвестно",
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await mainApi.addMovies(objFilm);
        const newSaved = await mainApi.getFavorite();
        setFilmsSaved(newSaved);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await mainApi.deleteMovies(film._id);
        const newSaved = await mainApi.getFavorite();
        setFilmsSaved(newSaved);
      } catch (err) {
        console.log("Во время удаления фильма произошла ошибка.");
      }
    }
  }

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((films) => {
        setFilms(films);
      })
      .catch((err) => {
        openPopup(`Ошибка сервера ${err}`);
      });

    const localStorageFilms = localStorage.getItem("films");

    mainApi.getFavorite().then((savedFilms) => {
      setFilmsSaved(savedFilms);
    });

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
      setFilms(filterData);
      setPreloader(false);
    }

    const localStorageFilmsTumbler = localStorage.getItem("filmsTumbler");
    const localStorageFilmsInputSearch =
      localStorage.getItem("filmsInputSearch");

    if (localStorageFilmsTumbler) {
      setFilmsTumbler(localStorageFilmsTumbler === "true");
    }

    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
    }
  }, [openPopup]);

  return (
    <section>
      <Header isLoggedIn={true} />
      <SearchForm
        handleGetMovies={handleGetMovies}
        filmsTumbler={filmsTumbler}
        filmsInputSearch={filmsInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader &&
        !errorText &&
        films !== null &&
        filmsSaved !== null &&
        filmsShowed !== null && (
          <MoviesCardList
            filmsRemains={films}
            handleMore={handleMore}
            films={filmsShowed}
            savedMoviesToggle={savedMoviesToggle}
            filmsSaved={filmsSaved}
          />
        )}
      <Footer />
    </section>
  );
};

export default Movies;
