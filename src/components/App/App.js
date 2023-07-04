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
import { useMovies } from "../../hooks/useMovies";

import moviesApi from "../../utils/MoviesApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const moviesHook = useMovies(moviesApi.getMovies);

  const mainApi = new MainApi({
    url: "https://api.katyzhe.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  /*---- Регистрация и авторизация ---- */

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
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
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((error) => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/signin", { replace: true });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage("");
  };

  /* ---- Обновить данные пользователя ----*/

  const handleUpdateUser = (newUserInfo) => {
    mainApi
      .updateUserInfo(newUserInfo)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: newUserInfo.name,
          email: newUserInfo.email,
        });
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
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

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
                moviesHook={moviesHook}
                isLoading={isLoading}
                component={Movies}
                isLoggedIn={isLoggedIn}
                //savedMovies={savedMovies}
                onLoading={setIsLoading}
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
                isLoggedIn={isLoggedIn}
                //savedMovies={savedMovies}
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
                isLoggedIn={isLoggedIn}
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
          <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
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
