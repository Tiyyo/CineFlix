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
  const constructionMovies = ["Allo", "Hexu", 4, 5];

  return (
    <div className="recommendation--list">
      <h2>Recommend for you</h2>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2,
          colums: 2,
        }}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="recommendation--swiper"
      >
        {constructionMovies.map((movie) => {
          return (
            <div>
              <SwiperSlide>{movie}</SwiperSlide>
              <SwiperSlide>{movie}</SwiperSlide>;
              <SwiperSlide>{movie}</SwiperSlide>;
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Recommendations;
