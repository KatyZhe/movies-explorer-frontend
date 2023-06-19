import React, { useContext, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import MainApi from "../../utils/MainApi";

const Profile = ({ onSignOut, loggedIn, openPopup }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    MainApi.updateUserInfo({ name, email }).then(() => {
      setVisibleButton(false);
      setLastName(name);
      setLastEmail(email);
      openPopup('Данные успешно изменены!');
    })
      .catch((err) => {
        openPopup(`Что-то пошло не так! ${err}`);
      });
  };

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile___form form" onSubmit={handleSubmit}>
          <div className="profile__value">
            <label className="profile__label">Имя</label>
            <input
              type="text"
              name="name"
              value={name || ""}
              onChange={handleNameChange}
              className="profile__input"
              required
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
            <label className="profile__label">E-mail</label>
            <input
              type="email"
              name="email"
              value={email || ""}
              onChange={handleEmailChange}
              className="profile__input"
              required
            />
          </div>
          <div className="profile__bottom">
            <button
              className="profile__edit"
              type="submit"
              disabled={!isVisibleButton}
            >
              Редактировать
            </button>
            <button
              className="profile__logout"
              type="button"
              onClick={() => onSignOut()}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
