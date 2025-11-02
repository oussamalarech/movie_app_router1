import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      posterURL:
        "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
      rating: 5,
      trailerLink: "https://www.youtube.com/embed/6hB3S9bIaco",
    },
    {
      id: 2,
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
      posterURL:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      rating: 5,
      trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0",
    },
    {
      id: 3,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
      posterURL:
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      rating: 5,
      trailerLink: "https://www.youtube.com/embed/EXeTwQWrcwY",
    },
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 3,
    trailerLink: "",
  });

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      movie.rating >= ratingFilter
  );

  const handleAddMovie = () => {
    if (
      newMovie.title &&
      newMovie.description &&
      newMovie.posterURL &&
      newMovie.trailerLink
    ) {
      setMovies([...movies, { ...newMovie, id: Date.now() }]);
      setNewMovie({
        title: "",
        description: "",
        posterURL: "",
        rating: 3,
        trailerLink: "",
      });
      setShowAddForm(false);
    }
  };

  // Movie Description View
  if (selectedMovie) {
    return (
      <div
        style={{ background: "#e0f0ff", minHeight: "100vh", padding: "20px" }}
      >
        <div className="movie-description">
          <h1>{selectedMovie.title}</h1>
          <img
            src={selectedMovie.posterURL}
            alt={selectedMovie.title}
            style={{
              maxWidth: "300px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
          <p
            style={{ fontSize: "1.1rem", lineHeight: "1.6", margin: "20px 0" }}
          >
            {selectedMovie.description}
          </p>
          <div
            className="movie-rating"
            style={{ fontSize: "1.5rem", marginBottom: "20px" }}
          >
            {"⭐".repeat(selectedMovie.rating)}
          </div>
          <iframe
            className="trailer-iframe"
            src={selectedMovie.trailerLink}
            title={selectedMovie.title}
            allowFullScreen
          />
          <button className="back-btn" onClick={() => setSelectedMovie(null)}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Main Home View
  return (
    <div style={{ background: "#e0f0ff", minHeight: "100vh" }}>
      <header className="app-header">
        <h1>My Movie Collection</h1>
        <p>Discover and organize your favorite movies</p>
      </header>

      <div className="center">
        <button
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add New Movie"}
        </button>
      </div>

      {showAddForm && (
        <div className="add-movie-form">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              rows="3"
              value={newMovie.description}
              onChange={(e) =>
                setNewMovie({
                  ...newMovie,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Poster URL</label>
            <input
              type="url"
              value={newMovie.posterURL}
              onChange={(e) =>
                setNewMovie({ ...newMovie, posterURL: e.target.value })
              }
            />
          </div>
          <div>
            <label>Trailer Link (YouTube embed)</label>
            <input
              type="url"
              value={newMovie.trailerLink}
              placeholder="https://www.youtube.com/embed/..."
              onChange={(e) =>
                setNewMovie({
                  ...newMovie,
                  trailerLink: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Rating: {newMovie.rating} / 5</label>
            <input
              type="range"
              min="1"
              max="5"
              value={newMovie.rating}
              onChange={(e) =>
                setNewMovie({
                  ...newMovie,
                  rating: Number(e.target.value),
                })
              }
            />
          </div>
          <button className="add-btn-green" onClick={handleAddMovie}>
            Add Movie
          </button>
        </div>
      )}

      <div className="filter-container">
        <div>
          <label>Filter by Title:</label>
          <input
            type="text"
            placeholder="Search movies..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
        <div>
          <label>
            Minimum Rating: {ratingFilter > 0 ? ratingFilter : "All"}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={movie.posterURL}
                alt={movie.title}
                className="movie-poster"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-rating">{"⭐".repeat(movie.rating)}</div>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              fontSize: "1.2rem",
            }}
          >
            No movies found
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
