import { useEffect, useState, useCallback, useMemo } from "react";

export const useSavedMovies = (MainApi) => {
  const [state, setState] = useState({
    isLoading: false,
    films: [],
    error: null,
  });
  // const localStorageSearch = localStorage.getItem("savedSearchInput") || "";
  // const localStorageTumbler = localStorage.getItem("savedChecked") === "true";

  const [search, setSearch] = useState('');
  const [shortFilms, setShortFilms] = useState(false);
  const SHORT_DURATION = 40;

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });
    const handleFetchFilms = async () => {
      try {
        let films = [];
        const isFilmsLocalstorage = JSON.parse(
          localStorage.getItem("savedFilms")
        );
        if (isFilmsLocalstorage) {
          films = isFilmsLocalstorage;
        } else {
          films = await MainApi.getFavorites(); //выходит, что при каждом изменении стейта идет запрос на сервер?
        }

        setState((state) => ({
          ...state,
          films,
        }));
      } catch (error) {
        setState((state) => ({
          ...state,
          error: error.errorText,
        }));
      } finally {
        setState((state) => ({
          ...state,
          isLoading: false,
        }));
      }
    };
    handleFetchFilms();
  }, []);

  const filtredFilms = useMemo(() => {
    const { films } = state;

    if (!search && !shortFilms) {
      return films;
    }

    const result = [];

    for (const film of films) {
      const { nameRU, duration } = film;
      const searched = search && nameRU.includes(search.toLowerCase());
      const short = shortFilms && duration < SHORT_DURATION;

      if (search && shortFilms) {
        if (searched && short) {
          result.push(film);
        }
      }

      if (search && !shortFilms) {
        if (searched) {
          result.push(film);
        }
      }

      if (!search && shortFilms) {
        if (short) {
          result.push(film);
        }
      }
    }
    localStorage.setItem("savedSearchedFilms", JSON.stringify(result));
    return result;
  }, [search, shortFilms, state]);

  /* фильмы не найдены */

  const notFound = (search || shortFilms) && filtredFilms.length === 0;

  /* при сабмите устанавливаем сюда значение */
  const handleSetSearch = useCallback((value) => {
    setSearch(value);
    //localStorage.setItem("savedSearchInput", value);
  }, []);

  /* при клике на чек-бокс достаем значение checked и устанавливаем state */
  const handleSetShortFilms = useCallback((checked) => {
    setShortFilms(checked);
    //localStorage.setItem("savedChecked", checked);
  }, []);

  const handleDeleteSaved = async (film) => {
    const id = film._id;
    try {
      await MainApi.deleteMovies(id);
      const savedMovies = state.films;
      const newSaved = savedMovies.filter((element) => {
        return element._id !== id;
      });
      setState({ ...state, films: newSaved });
      localStorage.setItem("savedFilms", JSON.stringify(newSaved));
    } catch (err) {
      setState({...state, error: "Невозможно удалить фильм из избранного"});
    }
  };

  return {
    handleSetSearch,
    handleSetShortFilms,
    filteredFilms: filtredFilms,
    notFound,
    initFilms: state.films,
    shortFilms,
    search,
    handleDeleteSaved,
  };
};
