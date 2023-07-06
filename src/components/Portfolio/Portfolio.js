import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://katyzhe.github.io/how-to-learn"
            target="_blank"
          >
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://katyzhe.github.io/russian-travel"
            target="_blank"
          >
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://github.com/KatyZhe/react-mesto-api-full-gha"
            target="_blank"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
