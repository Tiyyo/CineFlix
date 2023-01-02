import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Loader from "../Loader/Loader";

import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";

const LastestReleases = () => {
  const [lastReleaseMovies, setLastRelease] = useState([]);
  const [config, setConfig] = useState([]);

  console.log(config);
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
    <div className="last-release">
      <h2>Latest Release</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="swiper"
      >
        {lastReleaseMovies ? (
          lastReleaseMovies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <img
                  src={
                    config.base_url +
                    config.backdrop_sizes[0] +
                    movie.poster_path
                  }
                  alt={"image of " + movie.title}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default LastestReleases;
