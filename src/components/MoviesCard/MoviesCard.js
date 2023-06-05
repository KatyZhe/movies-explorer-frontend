import "./MoviesCard.css";

const MoviesCard = ({ isLiked, movie }) => {
  return (
    <div className="card">
      <img
        src={movie.image}
        alt={`Обложка фильма: ${movie.name}`}
        className="card__image"
      />
      <div className="card__description">
        <span className="card__name">{movie.name}</span>
        {isLiked ? (
          <button className="card__notliked" />
        ) : (
          <button className="card__liked" />
        )}
      </div>
      <span className="card__duration">{movie.duration}</span>
    </div>
  );
};

export default MoviesCard;
