import React from "react";
import { useParams, Link } from "react-router-dom";

const MovieDescription = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) return <h2 className="not-found">Movie not found</h2>;

  return (
    <div className="movie-description">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {movie.trailerLink && (
        <iframe
          width="560"
          height="315"
          src={movie.trailerLink}
          title={movie.title}
          frameBorder="0"
          allowFullScreen
          className="trailer-iframe"
        ></iframe>
      )}
      <br />
      <Link to="/">
        <button className="back-btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default MovieDescription;
