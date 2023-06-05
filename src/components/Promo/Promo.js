import React from "react";
import "./Promo.css";
import { HashLink as Link } from 'react-router-hash-link';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <nav className="promo__nav">
        <Link to="/#AboutProject" className="promo__link">
          О проекте
        </Link>
        <Link to="/#Technologies" className="promo__link">
          Технологии
        </Link>
        <Link to="/#AboutStudent" className="promo__link">
          Студент
        </Link>
      </nav>
    </section>
  );
};

export default Promo;
