import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import Trendings from "../../components/Container/Trendings";
import Recommendations from "../../components/Container/Recommendations";
import Avatar from "../../components/Navigation/Avatar";
import HonrizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";

const Home = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  const URLTopRated =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const trendingAllUrl =
    "https://api.themoviedb.org/3/trending/all/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.asc&air_date.lte=${date}&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const recommendationsMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate";

  const recommendationsTvShowUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const urls = [
    trendingAllUrl,
    lastReleaseMoviesUrl,
    lastReleaseTvShowUrl,
    recommendationsMoviesUrl,
    recommendationsTvShowUrl,
  ];

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const token = {
    headers: {
      Authorizarion:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTJhYmQ3ZTEwNzUzZWQ0MTBlZDc0MzlmN2UxZjkzZiIsInN1YiI6IjYzYWNhZjI2YmU0YjM2MDA4YTZjNzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMRrpkyDtkLPeFuYLeahtwVp_wU8c9Xo4ynqvH-KJhk",
      ContentType: "application/json;charset=utf-8",
    },
  };

 


  let x = Math.ceil(Math.random() * 19); // random number to limit the amout n of elements in content arry to map

  const pullData = (dataToPull) => {
    console.log(dataToPull);
  };
  
  const trendingAll = useFetch(trendingAllUrl);
  const lastReleaseMovies = useFetch(lastReleaseMoviesUrl)
  const lastReleaseTvShow = useFetch(lastReleaseTvShowUrl)
  const lastReleaseAll = [...lastReleaseMovies, ...lastReleaseTvShow];
  const recommendationsMovie = useFetch(recommendationsMoviesUrl)
  const recommendationsTvShow = useFetch(recommendationsTvShowUrl)
    const recommendationsAll = [
    ...recommendationsMovie,
    ...recommendationsTvShow,
  ];
  
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

  // useEffect(() => {
  //   const fetchGenreList = async () => {
  //     const result = await axios
  //       .get(
  //         "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR"
  //       )
  //       .then((res) => console.log(res.data.genres));
  //   };
  //   fetchGenreList();
  // }, []);


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
          <Trendings content={trendingAll} config={config} />
          <HonrizontalCarousel
            content={lastReleaseAll}
            config={config}
            title="What has been out lately ?"
            randomValue={x}
          />
          <Recommendations content={recommendationsAll} config={config} />
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

// --header 'Authorization: Bearer <<access_token>>' \
// --header 'Content-Type: application/json;charset=utf-8'
