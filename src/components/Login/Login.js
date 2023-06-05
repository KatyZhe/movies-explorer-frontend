import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/header-logo.svg';

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
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
    onLogin(formValue);
  };

  return (
    <div className='login__container'>
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
          value={formValue.email || ""}
          onChange={handleChange}
          pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
        />
        <span className='register__error'>{formValue.email}</span>
        <label className='login__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'
          required
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <span className='register__error'>{formValue.password}</span>
        <button className='login__button' type='submit'>
          Войти
        </button>
      </form>
      <div className='login__bottom'>
        <span>Ещё не зарегистрированы?</span>
        <Link to='signup' className='login__link'>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;
