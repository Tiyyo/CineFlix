import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import Overlay from "../Overlay/Overlay";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import DynamicRating from "./DynamicRating";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import Modal from "./Modal";

const MovieCard = (props) => {
  const { content, config } = props;
  console.log(content);
  const [open, setOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleConfigState = () => {
    if (config.length === 0) {
      return false;
    } else {
      return true;
    }
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

  const displayGenreMovie = () => {
    let movieGenre = content.genre_ids;
    let movieGenreNames = [];
    movieGenre.forEach((genre) => {
      genreList.forEach((el) => {
        console.log(el.id);
        if (el.id == genre) {
          movieGenreNames.push(el.name);
        }
      });
    });
    return movieGenreNames.map((genreName) => {
      return (
        <span key={content.name} className="genre-name">
          {genreName}
        </span>
      );
    });
  };

  const displayTypeIcon = (entries) => {
    if (entries === "movie") {
      return `<div>`;
    }
  };

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

  // console.log(content);
  return (
    <>
      <div
        className="movie-card"
        // layoutId={movie.id}
      >
        {handleConfigState() && content.poster_path ? (
          <div className="movie-card__image--container">
            <p className="movie-card__image--container__type">
              <TheatersOutlinedIcon sx={{ fontSize: "0.8rem" }} />
            </p>
            <DynamicRating
              rate={content.vote_average}
              className="movie-card__image--container__rating"
            />
            <img
              src={
                config.base_url + config.poster_sizes[1] + content.poster_path
              }
              alt={"poster of " + content.title}
              onClick={() => {
                setOpen(true);
              }}
            />
            <button className="movie-card__image--container__like-icon">
              <FavoriteTwoToneIcon
                sx={{ color: "rgba(235, 230, 225, 0.944)", fontSize: "1.2rem" }}
              />
            </button>
          </div>
        ) : (
          <div className="load--image__container"></div>
        )}
        <div className="movie-card__title">
          <h3>{content.title || content.name}</h3>
        </div>
      </div>
      {open && <Modal />}
    </>
  );
};

export default MovieCard;
