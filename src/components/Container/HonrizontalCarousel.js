import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import MovieCard from "../Cards/MovieCard";

const HonrizontalCarousel = (props) => {
  const [width, setWidth] = useState(0);
  const { content, config, title, randomValue } = props;
  const carousel = useRef();

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
            {content.length === 40 ? (
              content.slice(randomValue, 20).map((el) => {
                console.log(content);
                return (
                  <MovieCard
                    className="item"
                    key={el.id}
                    content={el}
                    config={config}
                  />
                );
              })
            ) : (
              <div className="loader_horizontal">
                <Loader />
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default HonrizontalCarousel;
