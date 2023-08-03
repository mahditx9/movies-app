import "./app.css";
import SearchIcon from "./Assets/search.svg";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
//API KEY
//21f36896
const API_URL = "https://www.omdbapi.com?apikey=21f36896";
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const searchMovies = async (title) => {
    console.log("search fired");

    setError(null);
    let request = await fetch(`${API_URL}&s=${title}`);
    let data = await request.json();
    try {
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        throw Error(data.Error);
      }
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies("interstellar");
    }, 1000);
    const clear = () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length ? (
        <div className="container">
          {movies.map((item) => (
            <MovieCard key={item.imdbID} movie={item} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>{error ? error.message : ""}</h2>
        </div>
      )}
    </div>
  );
}
