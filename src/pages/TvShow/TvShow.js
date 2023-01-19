import React, { useState, useEffect } from "react";
import Trendings from "../../components/Container/Trendings";
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Cards/MovieCard";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/Cards/BannerCard";
import Recommendations from "../../components/Container/Recommendations";
import ListByGenre from "../../components/Container/ListByGenre";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import axios from "axios";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import { Outlet } from "react-router-dom";
import useSearchShow from "../../utils/useSearchShow";

const TvShow2 = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  const trendingTvShowUrl =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&air_date.lte=${date}&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const recommendationsTvShowUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [genreList, setGenreList] = useState([]);
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
    content: trendingTvShows,
    error: error1,
    loading: loadTrends,
  } = useFetch(trendingTvShowUrl);

  const {
    content: lastReleaseTvShow,
    error: error3,
    loading: loadLastTvShows,
  } = useFetch(lastReleaseTvShowUrl);

  const {
    content: recommendationsTvShow,
    error: error6,
    loading: loadRecommendTvShows,
  } = useFetch(recommendationsTvShowUrl);

  let loadsArray = [loadTrends, loadLastTvShows, loadRecommendTvShows];

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

  const search = useSearchShow(inputSearchValue, pageNumber);
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
          <DisplaySearchResult
            search={search}
            getPageNumber={pullPageNumber}
            config={config}
          />
        </div>
      ) : !loading ? (
        <div className="loader--container">
          <Loader />
        </div>
      ) : (
        <div className="main">
          <Trendings
            content={trendingTvShows}
            config={config}
            title={"What is Trending now"}
          />
          <HorizontalCarousel
            content={lastReleaseTvShow}
            config={config}
            title="What has been out lately"
          />
          <Recommendations content={recommendationsTvShow} config={config}>
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

export default TvShow2;
