import axios from "axios";
import React, { useEffect, useState } from "react";
import LastestReleases from "../../components/LastestRelease/LastestReleases";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import TopRatedMovie from "../../components/Top Rated Movie/TopRatedMovie";
import MaterialIcon, { colorPalette } from "material-icons-react";

const Home = () => {
  const URLTopRated =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const [topMovies, setTopMovies] = useState(null);
  const [lastestMovies, setlastestMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [essai, setEssai] = useState(false);

  const handleSearchState = () => {
    const searchInput = document.querySelector(".search__input");
    const searchIcon = document.querySelector(".search__icon");
    const searchClose = document.querySelector(".search__close");
    const searchBackspace = document.querySelector(".search__backspace");
    const searchElements = [
      searchInput,
      searchIcon,
      searchClose,
      searchBackspace,
    ];
    console.log(searchActive);

    if (searchActive === "active") {
      searchElements.forEach((el) => {
        el.setAttribute("data-input", "active");
      });
    } else {
      searchElements.forEach((el) => {
        el.removeAttribute("data-input");
      });
    }
  };

  const handleClick = () => {
    setSearchActive(true);
  };

  let toggleClass = searchActive ? "isactive" : "  ";
  // const handleBackSpace = () => {
  //   const searchInput = document.querySelector(".search__input");
  //   return (searchInput.value = "" && searchInput.focus());
  // };

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
        <Navigation></Navigation>
        <div
          className="search__container"
          onClick={() => {
            setSearchActive(true);
          }}
        >
          <button className="search">
            <MaterialIcon
              className={
                searchActive
                  ? `material-icons md-24 md-dark search__icon isactive`
                  : "material-icons md-24 md-dark search__icon"
              }
              icon="search"
              color="#E79A21"
            />
            <MaterialIcon
              className="material-icons md-24 md-dark search__close "
              icon="close"
              color="#E79A21"
              onClick={() => {
                // handleBackSpace();
              }}
            />
            <MaterialIcon
              className="material-icons md-24 md-dark search__backspace "
              icon="backspace"
              size="tiny"
              color="#E79A21"
              onClick={() => {
                // setSearchActive(false);
                // console.log(searchActive);
                // handleSearchState();
              }}
            />
            <input
              type="text"
              className="search__input"
              placeholder={searchActive ? "Search" : ""}
              autoFocus
            />
          </button>
        </div>
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
