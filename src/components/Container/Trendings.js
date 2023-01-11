import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCard from "../Cards/BannerCard";

const Trendings = (props) => {
  const [genreList, setGenreList] = useState([]);

  const { content, config } = props;

  const imageFormatUrl = (el, number) => {
    return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
  };

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

  return (
    <div className="banner--container">
      <h2>Trending Last week</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="swiper"
      >
        {content && config !== undefined ? (
          content.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <BannerCard element={el} config={config} />
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

export default Trendings;
