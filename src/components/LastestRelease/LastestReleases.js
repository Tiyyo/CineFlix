import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import MovieCard from "../moviecard/MovieCard";

import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LastestReleases = () => {
  const [lastReleaseMovies, setLastRelease] = useState([]);
  const [config, setConfig] = useState([]);
  const [width, setWidth] = useState(0);
  const theme = createTheme({
    palette: {
      primary: {
        light: "#ffbd45",
        main: "#fb8c00",
        dark: "#c25e00",
        contrastText: "#000000",
      },
      secondary: {
        light: "#484848",
        main: "#121212",
        dark: "#000000",
        contrastText: "#ffffff",
      },
    },
  });

  const carousel = useRef();
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

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
    if (carousel.current == undefined) {
      console.log("current is not defined");
    } else {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  });

  useEffect(() => {
    const fetchLastRelease = async () => {
      const results = await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&release_date.lte=${date}&watch_region=FR&with_watch_monetization_types=flatrate
          `
        )
        .then((res) => setLastRelease(res.data.results));
    };
    fetchLastRelease();
  }, []);
  return (
    <div className="horizontal--single-x-card">
      <h2>Horizontal Single Card</h2>
      {lastReleaseMovies ? (
        <motion.div
          className="outer-cards-container"
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="cards-container"
          >
            {lastReleaseMovies.map((movie) => {
              const props = { movie, config };
              return (
                <MovieCard className="item" key={movie.id} props={props} />
              );
            })}
          </motion.div>
        </motion.div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LastestReleases;
