import React, { useState, useEffect } from "react";
import Trendings from "../../components/Container/Trendings";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/Cards/BannerCard";
import MovieCard from "../../components/Cards/MovieCard";
import Recommendations from "../../components/Container/Recommendations";
import ListByGenre from "../../components/Container/ListByGenre";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";
import axios from "axios";
import { Outlet } from "react-router-dom";

const Films = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  const trendingMoviesUrl =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&region=FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const recommendationsMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate";

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const favoriteGenre = [];

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
    content: trendingMovies,
    error: error1,
    loading: loadTrends,
  } = useFetch(trendingMoviesUrl);

  const {
    content: lastReleaseMovies,
    error: error2,
    loading: loadLastMovies,
  } = useFetch(lastReleaseMoviesUrl);

  const {
    content: recommendationsMovie,
    error: error5,
    loading: loadRecommendMovies,
  } = useFetch(recommendationsMoviesUrl);

  let loadsArray = [loadTrends, loadLastMovies, loadRecommendMovies];

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

  const search = useSearch(inputSearchValue, pageNumber);

  return (
    <div className="app">
      <div className="header">
        <Navigation></Navigation>
        <SearchBar
          getInputValue={pullInputValue}
          getOpenState={pullSearchOpenState}
        />
        <ProfileBtn />
      </div>
      {searchIsActive ? (
        <div className="search--result__container">
          <DisplaySearchResult search={search} getPageNumber={pullPageNumber} />
        </div>
      ) : !loading ? (
        <div className="loader--container">
          <Loader />
        </div>
      ) : (
        <div className="main">
          <Trendings content={trendingMovies} config={config}>
            <BannerCard />
          </Trendings>
          <HorizontalCarousel
            content={lastReleaseMovies}
            config={config}
            title="What has been out lately"
          />
          <Recommendations content={recommendationsMovie} config={config}>
            <MovieCard />
          </Recommendations>
          {/* {favoriteGenre.map((genre) => {
            return <ListByGenre key={genre} />;
          })} */}
        </div>
      )}
    </div>
  );
};

export default Films;
