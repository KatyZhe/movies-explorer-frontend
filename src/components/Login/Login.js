import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/header-logo.svg';
import isEmail from 'validator/es/lib/isEmail';
import useForm from "../../hooks/useForm";

const Login = ({ onLogin }) => {
  const { enteredValues, handleChange, errors } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
  };

  return (
    <section className='login__container'>
      <div className='login__header'>
        <Link to='/'>
          <img src={logo} alt='Логотип' className='login__logo' />
        </Link>

        <h1 className='login__title'>Рады видеть!</h1>
      </div>

      <form className='login__form form' onSubmit={handleSubmit}>
        <label className='login__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className='login__input'
          type='email'
          id='email'
          name='email'
          required
          value={enteredValues.email || ""}
          onChange={handleChange}
        />
        <span className='register__error'>{errors.email}</span>
        <label className='login__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'
          required
          value={enteredValues.password || ""}
          onChange={handleChange}
        />
        <span className='register__error'>{errors.password}</span>
        <button className='login__button' type='submit' disabled={!isEmail}>
          Войти
        </button>
      </form>
      <div className='login__bottom'>
        <span>Ещё не зарегистрированы?</span>
        <Link to='signup' className='login__link'>
          Регистрация
        </Link>
      </div>
    </section>
  );
};

export default Login;
