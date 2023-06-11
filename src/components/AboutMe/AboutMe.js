import "./AboutMe.css";
import photo from "../../images/photo_pass.jpg";

const AboutMe = () => {
  return (
    <section className="about-me" id="AboutStudent">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <span className="about-me__name">Катя</span>
          <span className="about-me__job">Фронтенд-разработчик, 36 лет</span>
          <span className="about-me__bio">
            Я живу в Химках (Московская обл.) и закончила МГТУ ГА по
            специальности менеджмент на воздушном транспорте. Знакомство с веб
            произошло в 2014 году, когда я занималась продвижением сайтов на
            WordPress. Мне было больше интересно ковыряться в начинке CMS, чем
            заниматься SMM. После 15летнего опыта в качестве инженера-технолога
            в Аэрофлоте я решила сменить деятельность на ту, о которой давно
            думала и мечтала. В свободное время я люблю много гулять, читать
            книги и заниматься йогой.
          </span>
          <a
            className="about-me__link"
            href="https://github.com/KatyZhe"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={photo} alt="Мое фото" />
      </div>
    </section>
  );
};

export default AboutMe;
