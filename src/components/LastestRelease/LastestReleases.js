import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Loader from "../Loader/Loader";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";

import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LastestReleases = () => {
  const [lastReleaseMovies, setLastRelease] = useState([]);
  const [config, setConfig] = useState([]);

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
                {movie.backdrop_path ? (
                  <div>
                    <img
                      src={
                        config.base_url +
                        config.backdrop_sizes[1] +
                        movie.backdrop_path
                      }
                      alt={"image of " + movie.title}
                    />
                    <h3>{movie.title}</h3>
                  </div>
                ) : (
                  <ThemeProvider theme={theme}>
                    <p className="message-error-img">
                      Image content not avaiable
                    </p>
                    <BrowserNotSupportedIcon
                      className="not-avaiable-icon"
                      color="primary"
                      size="large"
                    />
                    <p className="title-error-img">{movie.title}</p>
                  </ThemeProvider>
                )}
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
