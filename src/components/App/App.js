import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Popup from "../Popup/Popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainApi from "../../utils/MainApi";
import { auth } from "../../utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const mainApi = new MainApi({
    url: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  /*---- Регистрация и авторизация ---- */

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      console.log(jwt);
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, []);

  const handleRegistration = (enteredValues) => {
    auth
      .register(enteredValues.name, enteredValues.email, enteredValues.password)
      .then((res) => {
        if (res._id) {
          handleAuthorization(enteredValues);
        }
      })
      .catch((error) => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleAuthorization = (enteredValues) => {
    auth
      .authorize(enteredValues.email, enteredValues.password)
      .then((res) => {
        if (res) {
          console.log(res);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage("");
  };

  /* ---- Действия с фильмами ----*/

  const handleaddMovies = (movie) => {
    const jwt = localStorage.getItem("jwt");
    const handledMovie = savedMovies.find((item) => {
      return item.movieId === movie.id;
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      mainApi
        .deleteMovies(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(
            (item) => card._id !== item._id
          );
          localStorage.setItem("savedMovies", updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      mainApi
        .addMovies(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        });
    }
  };

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    mainApi
      .deleteMovies(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(
          (item) => card._id !== item._id
        );
        localStorage.setItem("savedMovies", updatedSavedMovies);
        setSavedMovies((prev) => updatedSavedMovies);
      })
      .catch((error) => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /* ---- Обновить данные пользователя ----*/

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.setItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
      setIsLoading(true);
      auth
        .updateUserInfo(newUserInfo, jwt)
        .then((data) => {
          setCurrentUser(data);
          setPopupMessage("Профиль успешно редактирован!");
          setIsPopupOpen(true);
        })
        .catch((error) => {
          setPopupMessage("При обновлении профиля произошла ошибка.");
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
              </>
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute
                isLoading={isLoading}
                component={Movies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onLoading={setIsLoading}
                onSave={handleaddMovies}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                isLoading={isLoading}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Register
                onRegister={handleRegistration}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            exact
            path="/signin"
            element={
              <Login onLogin={handleAuthorization} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
