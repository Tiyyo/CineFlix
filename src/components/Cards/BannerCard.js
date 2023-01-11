import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerCard = (props) => {
  const { element: el, config } = props;
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

  const imageFormatUrl = (el, number) => {
    return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
  };

  return (
    <div className="banner--card">
      {el.backdrop_path ? (
        <div className="banner--card__image--container">
          <img
            // number between 0 and 3 which represent the size of backdrop image
            src={imageFormatUrl(el, 1)}
            alt={"image of " + el.title || el.name}
            className="banner--card__image--container__image"
          />
          <h3 className="banner--card__image--container__title">
            {el.title || el.name}
          </h3>
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <p className="message-error-img">Image content not avaiable</p>
          <BrowserNotSupportedIcon
            className="not-avaiable-icon"
            color="primary"
            size="large"
          />
          <p className="title-error-img">{el.title || el.name}</p>
        </ThemeProvider>
      )}
    </div>
  );
};

export default BannerCard;
