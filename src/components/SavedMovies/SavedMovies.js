import React, { useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";
import { useSavedMovies } from "../../hooks/useSavedMovies";

const SavedMovies = ({ isLoggedIn }) => {
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");

  const mainApi = new MainApi({
    url: "https://api.katyzhe.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  const {
    handleSetSearch,
    handleSetShortFilms,
    filteredFilms,
    initFilms,
    shortFilms,
    search,
    handleDeleteSaved,
  } = useSavedMovies(mainApi);

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        shortFilms={shortFilms}
        handleSetSearch={handleSetSearch}
        handleShortFilms={handleSetShortFilms}
        search={search}
      />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      <MoviesCardList
        filmsRemains={0}
        savedMoviesToggle={handleDeleteSaved}
        films={filteredFilms}
      />
      <Footer />
    </section>
  );
};

export default SavedMovies;
