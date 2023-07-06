import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs" id="Technologies">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__large-title">7 технологий</h3>
      <span className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </span>
      <ul className="techs__list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React</li>
        <li>Git</li>
        <li>Express.js</li>
        <li>mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
