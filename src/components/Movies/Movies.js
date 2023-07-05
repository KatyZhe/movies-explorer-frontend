import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import { useMovies } from "../../hooks/useMovies";

const Movies = () => {
  //const [films, setFilms] = useState(null);
  const [filmsSaved, setFilmsSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState(null);

  const {
    handleSetSearch,
    handleSetShortFilms,
    filteredFilms,
    notFound,
    initFilms,
    shortFilms,
    search,
  } = useMovies(moviesApi.getMovies);

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
    const spliceFilms = filteredFilms;
    const newFilmsShowed = filmsShowed.concat(
      spliceFilms.slice(filmsShowed.length, MoviesCount[1] + filmsShowed.length)
    );
    setFilmsShowed(newFilmsShowed);
  }

  useEffect(() => {
    const sliceData = filteredFilms.slice(0, getMoviesCount()[0] + 1);
    setFilmsShowed(sliceData);
    console.log(sliceData, filteredFilms, getMoviesCount()[0]);
  }, [filteredFilms]);

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
        const res = await mainApi.addMovies(objFilm);
        const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
        const newSaved = savedMovies.concat(res);
        setFilmsSaved(newSaved);
        localStorage.setItem("savedFilms", JSON.stringify(newSaved));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await mainApi.deleteMovies(film._id);
        const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
        const newSaved = savedMovies.filter((element) => {
          return element._id !== film._id;
        });
        setFilmsSaved(newSaved);
        localStorage.setItem("savedFilms", JSON.stringify(newSaved));
      } catch (err) {
        console.log(`${err}`);
      }
    }
  }

  useEffect(() => {
    const localStorageFilmsSaved = localStorage.getItem("savedFilms");

    if (!localStorageFilmsSaved) {
      mainApi.getFavorite().then((savedFilms) => {
        //идет два запроса на сервер - за сохраненными фильмами и из хука useMovies
        setFilmsSaved(savedFilms);
        localStorage.setItem("savedFilms", JSON.stringify(savedFilms));
      });
    } else {
      const savedLocalFilms = JSON.parse(localStorageFilmsSaved);
      setFilmsSaved(savedLocalFilms);
    }
  }, []);

  return (
    <section>
      <Header isLoggedIn={true} />
      <SearchForm
        shortFilms={shortFilms}
        handleSetSearch={handleSetSearch}
        handleShortFilms={handleSetShortFilms}
        search={search}
      />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!errorText && filteredFilms !== null && filmsShowed !== null && (
        <MoviesCardList
          filmsRemains={filteredFilms.length - filmsShowed.length}
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
