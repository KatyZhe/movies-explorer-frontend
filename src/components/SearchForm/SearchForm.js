import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ handleShortFilms, shortFilms, handleSetSearch, search }) => {
const [input, setInput] = useState(search);
const [checked, setChecked] = useState(shortFilms);

  function handleInputChange(evt) {
    setInput(evt.target.value);
  }

  function handleTumblerChange(evt) {
    const newTumbler = !checked;
    handleShortFilms(newTumbler);
    setChecked(newTumbler);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSetSearch(input);
  }

  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <div className="search__icon"></div>
          <input
            className="search__input"
            type="text"
            name="search"
            placeholder="Фильм"
            value={input || ""}
            onChange={handleInputChange}
            required
          />
          <button
            className="search__button"
            type="submit"
            onClick={handleSubmit}
          ></button>
        </form>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input
              type="checkbox"
              className="search__checkbox"
              checked={!checked}
              onChange={handleTumblerChange}
            />
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
