import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    onRegister(formValue);
  };

  return (
    <section className="register__container">
      <div className="register__header">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>

        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form className="register__form form" onSubmit={handleSubmit}>
        <label className="register__label" htmlFor="name">
          Имя
        </label>
        <input
          className="register__input"
          type="text"
          id="name"
          name="name"
          minLength={2}
          required
          value={formValue.name || ""}
          onChange={handleChange}
        />
        <span className="register__error">При регистрации пользователя произошла ошибка.</span>
        <label className="register__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          required
          value={formValue.email || ""}
          onChange={handleChange}
          pattern={"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"}
        />
        <span className="register__error">Пользователь с таким email уже существует.</span>
        <label className="register__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="register__input"
          type="password"
          id="password"
          name="password"
          minLength={6}
          required
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <span className="register__error">Пароль не соответствует правилам.</span>
        <button
          className="register__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__bottom">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;