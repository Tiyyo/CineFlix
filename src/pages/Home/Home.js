import axios from "axios";
import React, { useEffect, useState } from "react";
import LastestReleases from "../../components/LastestRelease/LastestReleases";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import TopRatedMovie from "../../components/Top Rated Movie/TopRatedMovie";
import SearchBar from "../../components/SearchBar/SearchBar";
import Trendings from "../../components/Genre/Trendings";
import Recommendations from "../../components/Recommendations/Recommendations";
import Avatar from "../../components/Navigation/Avatar";

const Home = () => {
  const URLTopRated =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const [searchIsActive, setSearchActive] = useState(false);
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
        <Avatar />
      </div>
      {searchIsActive ? (
        <div className="search--result__container"></div>
      ) : loading ? (
        <div className="main">
          <Trendings />
          <LastestReleases />
          <Recommendations />
          {/* <TopRatedMovie topMovies={topMovies} /> */}
        </div>
      ) : (
        <div className="loader--container">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
