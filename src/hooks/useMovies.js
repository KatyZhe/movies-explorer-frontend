import { useEffect, useState, useCallback, useMemo } from "react";

export const useMovies = (fetchFilms) => {
  const [state, setState] = useState({
    isLoading: false,
    films: [],
    error: null,
  });
  const localStorageSearch = localStorage.getItem("searchInput") || "";
  const localStorageTumbler = localStorage.getItem("checked") === "true";

  const [search, setSearch] = useState(localStorageSearch);
  const [shortFilms, setShortFilms] = useState(localStorageTumbler);
  const SHORT_DURATION = 40;

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     isLoading: true,
  //   });
  //   const handleFetchFilms = async () => {
  //     try {
  //       let films = [];
  //       const isFilmsLocalstorage = JSON.parse(localStorage.getItem("films"));
  //       if (isFilmsLocalstorage) {
  //         films = isFilmsLocalstorage;
  //       } else {
  //         films = await fetchFilms(); //выходит, что при каждом изменении стейта идет запрос на сервер?
  //         //localStorage.setItem('films', JSON.stringify(films)); // какой из них надо удалить - этот?
  //       }

  //       setState((state) => ({
  //         ...state,
  //         films,
  //       }));
  //     } catch (error) {
  //       setState((state) => ({
  //         ...state,
  //         error: error.errorText,
  //       }));
  //     } finally {
  //       setState((state) => ({
  //         ...state,
  //         isLoading: false,
  //       }));
  //     }
  //   };
  //   handleFetchFilms();
  // }, []);

  const filtredFilms = useMemo(() => {
    const { films } = state;
    if (state.isLoading || search === "") {
      return [];
    }
    if (!films.length) {
      setState({
        ...state,
        isLoading: true,
      });
      const handleFetchFilms = async () => {
        try {
          let films = [];
          films = await fetchFilms(); //выходит, что при каждом изменении стейта идет запрос на сервер?

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
      return ([]);
    }

    if (!search && !shortFilms) {
      return films;
    }

    const result = [];

    for (const film of films) {
      const { nameRU, duration } = film;
      const searched = search && nameRU.includes(search);
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
    localStorage.setItem("searchedFilms", JSON.stringify(result)); // какой из них надо удалить - этот?
    return result;
  }, [search, shortFilms, state.isLoading]);

  /* фильмы не найдены */

  const notFound = (search || shortFilms) && filtredFilms.length === 0;

  /* при сабмите устанавливаем сюда значение */
  const handleSetSearch = useCallback((value) => {
    setSearch(value);
    localStorage.setItem("searchInput", value);
  }, []);

  /* при клике на чек-бокс достаем значение checked и устанавливаем state */
  const handleSetShortFilms = useCallback((checked) => {
    setShortFilms(checked);
    localStorage.setItem("checked", checked);
  }, []);

  return {
    handleSetSearch,
    handleSetShortFilms,
    filteredFilms: filtredFilms,
    notFound,
    initFilms: state.films,
    shortFilms,
    search,
  };
};
