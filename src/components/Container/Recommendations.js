import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import MovieCard from "../Cards/MovieCard";
import RecommendCard from "../Cards/RecommendCard";

const Recommendations = (props) => {
  const { content, config } = props;

  const tableau = [1, 2, 3, 4, 5];

  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  console.log(tableau);
  console.log(shuffle(tableau));

  // // Used like so
  // var arr = [2, 11, 37, 42];
  // shuffle(arr);
  // console.log(arr);

  return (
    <div className="recommendation--list">
      <h2>You should look at it </h2>
      <div className="recommendation--swiper">
        {shuffle(content)
          .slice(0, 12)
          .map((el) => {
            return <RecommendCard key={el.id} content={el} config={config} />;
          })}
      </div>
    </div>
  );
};

export default Recommendations;
