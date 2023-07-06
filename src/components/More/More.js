import './More.css';

function More({ handleMore }) {
  return (
    <section className="more">
      <button className="more__button" type="button" onClick={handleMore}>
        Ещё
      </button>
    </section>
  );
}

export default More;