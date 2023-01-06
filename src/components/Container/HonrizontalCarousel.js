import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import MovieCard from "../Cards/MovieCard";

import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const HonrizontalCarousel = (props) => {
  const [lastReleaseMovies, setLastRelease] = useState([]);
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
  const { content, config, title, randomValue } = props;
  const carousel = useRef();
  let currentDate = new Date();
  const date = currentDate.setMonth(-1);

  useEffect(() => {
    if (carousel.current == undefined) {
      console.log("current is not defined");
    } else {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  });

  return (
    <div className="horizontal--single-x-card">
      <h2>{title}</h2>
      {content ? (
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
            {content.slice(randomValue, 20).map((el) => {
              return (
                <MovieCard
                  className="item"
                  key={el.id}
                  content={el}
                  config={config}
                />
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

export default HonrizontalCarousel;
