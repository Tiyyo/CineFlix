import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import MovieCard from "../Cards/MovieCard";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";

const TopRatedMovie = ({ topMovies }) => {
  const [topMoviesResults, setTopMoviesResults] = useState();
  const [config, setConfig] = useState([]);
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    if (carousel.current == undefined) {
      console.log("current is not defined");
    } else {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  });
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
    setTopMoviesResults(topMovies);
  }, [topMovies]);

  return (
    <div className="top-rated-movie">
      <h2>Most Popular</h2>
      {topMoviesResults ? (
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
            {topMoviesResults.map((movie) => {
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

export default TopRatedMovie;
