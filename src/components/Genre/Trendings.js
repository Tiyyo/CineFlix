import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import MovieCard from "../moviecard/MovieCard";
import { MotionConfig } from "framer-motion";
import { motion } from "framer-motion";

const Trendings = () => {
  const [trendingMovies, setTrendMovie] = useState();
  const [config, setConfig] = useState([]);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const [genreList, setGenreList] = useState([]);
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
    const fetchGenreList = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR"
        )
        .then((res) => setGenreList(res.data.genres));
    };
    fetchGenreList();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const result = await axios
        .get(
          "https://api.themoviedb.org/3/trending/movie/week?api_key=3e2abd7e10753ed410ed7439f7e1f93f"
        )
        .then((res) => {
          setTrendMovie(res.data.results);
        });
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div className="genre-list">
      <h2>Trends Last Week</h2>
      {trendingMovies ? (
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
            {trendingMovies.map((movie) => {
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

export default Trendings;
