import React, { useState, useEffect } from "react";
import Trendings from "../../components/Container/Trendings";
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Cards/MovieCard";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/Cards/BannerCard";
import Recommendations from "../../components/Container/Recommendations";
import InfiniteHorizontalCarousel from "../../components/Container/InfiniteHorizontalCarousel";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import axios from "axios";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import useSearchShow from "../../utils/useSearchShow";
import Promoted from "../../components/Container/Promoted";
import FavoriteGenre from "../../components/Container/FavoriteGenre";
import { CircularProgress } from "@mui/material";

const TvShow2 = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  let promotedElementPageNumber = 1;

  const trendingTvShowUrl =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f";

  const lastReleaseTvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=popularity.desc&air_date.lte=${date}&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const recommendationsTvShowUrl =
    "https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&page=1&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

  const tvShowOnAirUrl =
    "https://api.themoviedb.org/3/tv/on_the_air?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1";

  const promotedShowsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&page=${promotedElementPageNumber}&vote_average.gte=6&vote_count.gte=100&include_null_first_air_dates=false&with_watch_providers=FR&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;

  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState([]);
  const [genreListMovie, setGenreListMovie] = useState([]);
  const [genreListTv, setGenreListTv] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [navIsOpen, setNavOpen] = useState(false);
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

  const pullNavState = (something) => {
    setNavOpen(something);
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

  const {
    content: tvShowOnAir,
    error: tvShowOnAirError,
    loading: loadTvShowOnAir,
  } = useFetch(tvShowOnAirUrl);

  const {
    content: promotedTvShows,
    error: promotedTvShowError,
    loading: loadPromotedShow,
  } = useFetch(promotedShowsUrl);

  let loadsArray = [
    loadTrends,
    loadLastTvShows,
    loadRecommendTvShows,
    loadTvShowOnAir,
    loadPromotedShow,
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

  useEffect(() => {
    const fetchGenreListMovie = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListMovie(res.data.genres));
    };
    fetchGenreListMovie();
  }, []);

  useEffect(() => {
    const fetchGenreListTv = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US"
        )
        .then((res) => setGenreListTv(res.data.genres));
    };
    fetchGenreListTv();
  }, []);

  const search = useSearchShow(inputSearchValue, pageNumber);
  return (
    <div
      className="app"
      onClick={() => {
        if (navIsOpen) {
          setNavOpen(false);
        }
      }}
    >
      <div className="header">
        <Navigation getNavState={pullNavState} parentNavState={navIsOpen} />
        <SearchBar
          getInputValue={pullInputValue}
          getOpenState={pullSearchOpenState}
        />
        <ProfileBtn />
      </div>
      {searchIsActive ? (
        <DisplaySearchResult
          search={search}
          getPageNumber={pullPageNumber}
          config={config}
        />
      ) : !loading ? (
        <div className="loading">
          <CircularProgress sx={{ color: "#fb8c00" }} />
        </div>
      ) : (
        <div className="main">
          <Trendings
            content={tvShowOnAir}
            config={config}
            title="On TV Today"
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />
          <HorizontalCarousel
            content={lastReleaseTvShow}
            config={config}
            title="What has been out lately"
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />
          <HorizontalCarousel
            content={trendingTvShows}
            config={config}
            title={"What is Trending now"}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />
          <Promoted
            content={promotedTvShows}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />
          <FavoriteGenre
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
            dataToDisplay="TvShow"
          />
          <Promoted
            content={promotedTvShows}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />
        </div>
      )}
    </div>
  );
};

export default TvShow2;
