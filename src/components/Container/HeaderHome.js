import React, { useEffect, useRef, useState } from "react";
import useWindowSize from "../../utils/useWindowSize";

const HeaderHome = (props) => {
  const { content, config, getHeight } = props;

  const [posterToDisplay, setPosterToDisplay] = useState(1);
  const [height, setHeight] = useState();
  const image = useRef();
  const windowSize = useWindowSize();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setHeight(entry.target.clientHeight);
      getHeight(height);
    });
    observer.observe(image.current);
  }, [image, windowSize]);

  useEffect(() => {
    const changeImage = setInterval(() => {
      setPosterToDisplay(Math.floor(Math.random() * 19));
    }, 7500);
    return () => clearInterval(changeImage);
  }, []);

  return (
    <div className="home-image">
      <img
        src={
          config.base_url +
          config.poster_sizes[4] +
          content[posterToDisplay].poster_path
        }
        alt="poster"
        ref={image}
      />
    </div>
  );
};

export default HeaderHome;
