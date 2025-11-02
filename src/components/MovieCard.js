import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {/* Clicking the card navigates to the movie description page */}
      <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">⭐ {movie.rating}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
