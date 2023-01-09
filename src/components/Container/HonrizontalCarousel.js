import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import MovieCard from "../Cards/MovieCard";

const HonrizontalCarousel = (props) => {
  const { content, config, title } = props;
  const [width, setWidth] = useState(0);
  const carousel = useRef();

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
      {content.length > 1 ? (
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
            {shuffle(content)
              .slice(0, 20)
              .map((el) => {
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
