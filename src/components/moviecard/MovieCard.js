import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import Overlay from "../Overlay/Overlay";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";

const MovieCard = ({ props }) => {
  const { movie, config } = props;
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
    let movieGenre = movie.genre_ids;
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
        <span key={movie.name} className="genre-name">
          {genreName}
        </span>
      );
    });
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

  return (
    <>
      <div
        className="movie-card"
        // layoutId={movie.id}
      >
        {handleConfigState() ? (
          <img
            src={config.base_url + config.poster_sizes[1] + movie.poster_path}
            alt={"poster of " + movie.title}
            onClick={() => {
              setOpen(true);
            }}
          />
        ) : (
          <Loader />
        )}
        <div className="movie-card__infos">
          <h3>{props.movie.title}</h3>
          <div className="movie-card__like-icon">
            <FavoriteTwoToneIcon
              sx={{ color: "rgba(235, 230, 225, 0.944)", fontSize: "1.2rem" }}
            />
          </div>
        </div>
        <div className="movie-card__rating"></div>
      </div>
      {open && (
        <Overlay>
          <div className="modal">
            <ThemeProvider theme={theme}>
              <div className="modal__close-icon" onClick={closeModal}>
                <CloseIcon sx={{ fontSize: "2.5rem" }} />
              </div>
              {handleConfigState() ? (
                <img
                  src={
                    config.base_url + config.poster_sizes[2] + movie.poster_path
                  }
                  alt={"poster of " + movie.title}
                />
              ) : (
                <Loader />
              )}
              <h3 className="modal__title">{movie.title}</h3>
              <p className="modal__synopsis">{movie.overview}</p>
              <div className="modal__labels">
                <div className="modal__genre">{displayGenreMovie()}</div>

                <div className="modal__release--date">{movie.release_date}</div>

                <div className="modal__rating">
                  <span className="modal__rating__star-icon">
                    <StarOutlineIcon
                      sx={{
                        color: "rgba(235, 230, 225, 0.944)",
                      }}
                    />
                  </span>
                  <span className="modal__rating__rate">
                    <em>{movie.vote_average}</em> / 10{" "}
                  </span>
                </div>
              </div>
              <div className="modal_like-icon">
                <FavoriteTwoToneIcon />
              </div>
            </ThemeProvider>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default MovieCard;
