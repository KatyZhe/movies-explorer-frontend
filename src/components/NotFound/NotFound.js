import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (

<div className="notfound__container">
  <div className="notfound__block">
    <span className="notfound__status">404</span>
    <span className="notfound__text">Страница не найдена</span>
  </div>
  <Link to='/' className='notfound__back'>Назад</Link>
</div>
  )
}

export default NotFound;
