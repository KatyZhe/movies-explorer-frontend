import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<><Header loggedIn={true} /><Main /></>} />
        <Route exact path="/movies" element={<Movies loggedIn={true} />} />
        <Route exact path="/saved-movies" element={<SavedMovies loggedIn={true} />} />
        <Route exact path="/profile" element={<Profile loggedIn={true} />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
