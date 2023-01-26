import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import "swiper/css";
import "swiper/css/pagination";
import { createTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import BannerCard from "../Cards/BannerCard";

const Trendings = (props) => {
  const { content, config, title } = props;

  return (
    <div className="banner--container">
      <h2>{title}</h2>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="swiper"
      >
        {content && config !== undefined ? (
          content
            .filter((el) => el.backdrop_path)
            .map((el) => {
              return (
                <SwiperSlide key={el.id}>
                  <BannerCard element={el} />
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
