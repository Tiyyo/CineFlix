import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import MovieCard from "../moviecard/MovieCard";

const TopRatedMovie = ({ topMovies }) => {
  const [topMoviesResults, setTopMoviesResults] = useState();
  const [config, setConfig] = useState([]);

  useEffect(() => {
    const fetchConfig = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/configuration?api_key=3e2abd7e10753ed410ed7439f7e1f93f"
        )
        .then((res) => setConfig(res.data.images));
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    setTopMoviesResults(topMovies);
  }, [topMovies]);

  return (
    <div className="top-rated-movie">
      <h2>Most Popular</h2>
      {topMoviesResults ? (
        <ul className="cards-container">
          {topMoviesResults.map((movie) => {
            const props = { movie, config };
            return <MovieCard props={props} key={movie.id} />;
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TopRatedMovie;
