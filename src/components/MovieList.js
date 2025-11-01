import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.length === 0 ? (
        <div className="col-span-full text-center py-12 text-gray-500">
          No movies found. Try adjusting your filters or add a new movie!
        </div>
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
};

export default MovieList;
