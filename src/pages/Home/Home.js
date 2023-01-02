import axios from "axios";
import React, { useEffect, useState } from "react";
import LastestReleases from "../../components/LastestRelease/LastestReleases";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import TopRatedMovie from "../../components/Top Rated Movie/TopRatedMovie";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const URLTopRated =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
  const [topMovies, setTopMovies] = useState(null);
  const [lastestMovies, setlastestMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
