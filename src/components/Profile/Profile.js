import React, { useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = ({ loggedIn }) => {
  const [name, setName] = useState('Имя');
  const [email, setEmail] = useState('email@email.com');

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, Имя!</h1>
        <form className='profile___form form'>
          <div className='profile__value'>
            <label className='profile__label'>Имя</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className='profile__input'
              required
            />
          </div>
          <div className='profile__line'></div>
          <div className='profile__value'>
            <label className='profile__label'>E-mail</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='profile__input'
              required
            />
          </div>
          <div className='profile__bottom'>
            <button className='profile__edit' type='submit'>
              Редактировать
            </button>
            <button className='profile__logout' type='button'>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
