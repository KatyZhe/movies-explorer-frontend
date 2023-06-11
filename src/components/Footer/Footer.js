import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </span>
      <div className="footer__bottom-block">
        <span className="footer__copyright">&copy; {currentYear}</span>
        <div className="footer__socials">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/KatyZhe"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
