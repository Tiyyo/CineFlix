import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import Trendings from "../../components/Container/Trendings";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import Recommendations from "../../components/Container/Recommendations";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import HonrizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";

const Home = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  const trendingAllUrl =
    "https://api.themoviedb.org/3/trending/all/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.asc&air_date.lte=${date}&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const recommendationsMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate";

  const recommendationsTvShowUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const token = {
    headers: {
      Authorizarion:
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTJhYmQ3ZTEwNzUzZWQ0MTBlZDc0MzlmN2UxZjkzZiIsInN1YiI6IjYzYWNhZjI2YmU0YjM2MDA4YTZjNzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BMRrpkyDtkLPeFuYLeahtwVp_wU8c9Xo4ynqvH-KJhk",
      ContentType: "application/json;charset=utf-8",
    },
  };

  const pullInputValue = (inputValue) => {
    setInputSearchValue(inputValue);
    if (inputValue.length >= 1) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const pullSearchOpenState = (state) => {
    if (state === true) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const pullPageNumber = (something) => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const {
    content: trendingAll,
    error: error1,
    loading: loadTrends,
  } = useFetch(trendingAllUrl);

  const {
    content: lastReleaseMovies,
    error: error2,
    loading: loadLastMovies,
  } = useFetch(lastReleaseMoviesUrl);

  const {
    content: lastReleaseTvShow,
    error: error3,
    loading: loadLastTvShows,
  } = useFetch(lastReleaseTvShowUrl);

  const lastReleaseAll = [...lastReleaseMovies, ...lastReleaseTvShow];

  const {
    content: recommendationsMovie,
    error: error5,
    loading: loadRecommendMovies,
  } = useFetch(recommendationsMoviesUrl);
  const {
    content: recommendationsTvShow,
    error: error6,
    loading: loadRecommendTvShows,
  } = useFetch(recommendationsTvShowUrl);

  const recommendationsAll = [
    ...recommendationsMovie,
    ...recommendationsTvShow,
  ];

  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${inputSearchValue}&page=${pageNumber}&include_adult=false`;

  const search = useSearch(inputSearchValue, pageNumber);

  let loadsArray = [
    loadTrends,
    loadLastMovies,
    loadLastTvShows,
    loadRecommendMovies,
    loadRecommendTvShows,
  ];

  useEffect(() => {
    const updatelLoading = () => {
      const isTrue = (el) => {
        return el === true;
      };
      return setLoading(loadsArray.every(isTrue));
    };
    updatelLoading();
  }, [loadsArray]);

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
    setPageNumber(1);
  }, [inputSearchValue]);

  return (
    <div className="app">
      <div className="header">
        <Navigation />
        <SearchBar
          getInputValue={pullInputValue}
          getOpenState={pullSearchOpenState}
        />
        <ProfileBtn />
      </div>
      {searchIsActive === true ? (
        <div className="search--result__container">
          <DisplaySearchResult
            search={search}
            getPageNumber={pullPageNumber}
            config={config}
          />
        </div>
      ) : loading ? (
        <div className="main">
          <Trendings
            content={trendingAll}
            config={config}
            title={"What is Trending now"}
          />
          <HonrizontalCarousel
            content={lastReleaseAll}
            config={config}
            title="What has been out lately ?"
          />
          <Recommendations content={recommendationsAll} config={config} />
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
