import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import MovieCard from "../moviecard/MovieCard";

const Recommendations = () => {
  const constructionMovies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  return (
    <div className="recommendation--list">
      <h2>Recommend for you</h2>
      <div className="recommendation--swiper">
        {constructionMovies.map((movie) => {
          return <div className="swiper-slide">Film {movie}</div>;
        })}
      </div>
    </div>
  );
};

export default Recommendations;
