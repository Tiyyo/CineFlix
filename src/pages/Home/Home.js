import axios from "axios";
import React, { useEffect, useState } from "react";
import LastestReleases from "../../components/LastestRelease/LastestReleases";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import TopRatedMovie from "../../components/Top Rated Movie/TopRatedMovie";
import SearchBar from "../../components/SearchBar/SearchBar";
import MoviesByGenre from "../../components/Genre/MoviesByGenre";
import Trendings from "../../components/Genre/Trendings";

const Home = () => {
  const URLTopRated =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const [topMovies, setTopMovies] = useState(null);
  const [lastestMovies, setlastestMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenreList = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR"
        )
        .then((res) => console.log(res.data.genres));
    };
    fetchGenreList();
  }, []);

  useEffect(() => {
    const fetchDataTopMovies = async () => {
      const result = await axios.get(URLTopRated).then((res) => {
        setTopMovies(res.data.results);
        setLoading(true);
      });
    };
    fetchDataTopMovies();
  }, []);

  return (
    <div className="app">
      <div className="header">
        <Navigation />
        <SearchBar />
      </div>
      {loading ? (
        <div className="main">
          <LastestReleases />
          <TopRatedMovie topMovies={topMovies} />
          <MoviesByGenre />
          <Trendings />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
