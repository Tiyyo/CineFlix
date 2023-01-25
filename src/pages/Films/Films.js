import React, { useState, useEffect, useRef } from "react";
import Trendings from "../../components/Container/Trendings";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/Cards/BannerCard";
import MovieCard from "../../components/Cards/MovieCard";
import Recommendations from "../../components/Container/Recommendations";
import InfiniteHorizontalCarousel from "../../components/Container/InfiniteHorizontalCarousel";
import ProfileBtn from "../../components/Navigation/ProfileBtn";
import DisplaySearchResult from "../../utils/DisplaySearchResult";
import useFetch from "../../utils/useFetch";
import useSearch from "../../utils/useSearch";
import axios from "axios";
import { Outlet } from "react-router-dom";
import useSearchMovie from "../../utils/useSearchMovie";
import FavoriteGenre from "../../components/Container/FavoriteGenre";
import Promoted from "../../components/Container/Promoted";

const Films = () => {
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);
  const promotedElementPageNumber = useRef();

  const upcomingMovieUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1&region=FR";

  const lastReleaseMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&region=FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate`;

  const recommendationsMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate";

  const promotedMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${promotedElementPageNumber.current}&vote_count.gte=5000&vote_average.gte=8&with_watch_monetization_types=flatrate`;

  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=en-US&page=1&region=FR";

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
    console.log(something);
    setPageNumber((prevPageNumber) => prevPageNumber + something);
  };

  const pullNavState = (something) => {
    setNavOpen(something);
  };

  const {
    content: upcomingMovies,
    error: error1,
    loading: loadTrends,
  } = useFetch(upcomingMovieUrl);

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

  const {
    content: promotedMovies,
    error: promotedMovieError,
    loading: loadPromotedMovie,
  } = useFetch(promotedMoviesUrl);

  const {
    content: popularMovies,
    error: popularMoviesError,
    loading: loadPopularMovie,
  } = useFetch(popularMoviesUrl);

  let loadsArray = [
    loadTrends,
    loadLastMovies,
    loadRecommendMovies,
    loadPromotedMovie,
    loadPopularMovie,
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

  useEffect(() => {
    setPageNumber(1);
  }, [inputSearchValue]);

  useEffect(() => {
    promotedElementPageNumber.current = Math.floor(Math.random() * 6);
  }, []);

  const search = useSearchMovie(inputSearchValue, pageNumber);

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
        <div className="loader--container">
          <Loader />
        </div>
      ) : (
        <div className="main">
          <Trendings
            content={upcomingMovies}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
            title={"What is coming soon next"}
          />
          <HorizontalCarousel
            content={lastReleaseMovies}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
            title="What has been out lately"
          />
          <Promoted content={promotedMovies} config={config} />
          <HorizontalCarousel
            content={popularMovies}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
            title="Popular"
          />
          <FavoriteGenre
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
            dataToDisplay="Movie"
          />
          <Promoted
            content={promotedMovies}
            config={config}
            genreListMovie={genreListMovie}
            genreListTv={genreListTv}
          />

          {/* <Recommendations content={recommendationsMovie} config={config}>
            <MovieCard />
          </Recommendations> */}
          {/* {favoriteGenre.map((genre) => {
            return <ListByGenre key={genre} />;
          })} */}
        </div>
      )}
    </div>
  );
};

export default Films;
