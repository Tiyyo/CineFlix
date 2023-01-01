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
  //   const handleSearchState = () => {
  //     const searchInput = document.querySelector(".search__input");
  //     const searchIcon = document.querySelector(".search__icon");
  //     const searchClose = document.querySelector(".search__close");
  //     const searchBackspace = document.querySelector(".search__backspace");
  //     const searchElements = [
  //       searchInput,
  //       searchIcon,
  //       searchClose,
  //       searchBackspace,
  //     ];
  //     console.log(searchActive);
  //     if (searchActive === "active") {
  //       searchElements.forEach((el) => {
  //         el.setAttribute("data-input", "active");
  //       });
  //     } else {
  //       searchElements.forEach((el) => {
  //         el.removeAttribute("data-input");
  //       });
  //     }
  //   };
  //   const handleClick = () => {
  //     setSearchActive(true);
  //   };
  //   let toggleClass = searchActive ? "isactive" : "  ";
  //   // const handleBackSpace = () => {
  //   //   const searchInput = document.querySelector(".search__input");
  //   //   return (searchInput.value = "" && searchInput.focus());
  //   // };
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
        {/* <div
          className="search__container"
          onClick={() => {
            setSearchActive(true);
          }}
        >
          <button className="search">
            <svg
              className={
                searchActive ? "search__icon isactive" : "search__icon"
              }
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              fill="#E79A21"
            >
              <path d="m19.825 21.65-6.35-6.35q-.75.575-1.837.912-1.088.338-2.213.338-2.975 0-5.037-2.062-2.063-2.063-2.063-5.038t2.063-5.038Q6.45 2.35 9.425 2.35t5.038 2.062q2.062 2.063 2.062 5.038 0 1.125-.312 2.15-.313 1.025-.913 1.825l6.375 6.375Zm-10.4-7.75q1.875 0 3.163-1.288 1.287-1.287 1.287-3.162t-1.287-3.163Q11.3 5 9.425 5 7.55 5 6.263 6.287 4.975 7.575 4.975 9.45q0 1.875 1.288 3.162Q7.55 13.9 9.425 13.9Z" />
            </svg>

            <MaterialIcon
              searchactive={searchActive ? true : false}
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
              className={
                searchActive ? "search__input isactive" : "search__input"
              }
              placeholder={searchActive ? "Search" : ""}
              autoFocus
            />
          </button>
        </div> */}
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
