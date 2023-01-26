import Loader from "../Loader/Loader";
import { useState, useEffect, useContext } from "react";
import Overlay from "../Overlay/Overlay";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import DynamicRating from "./DynamicRating";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import HideImageIcon from "@mui/icons-material/HideImage";
import Modal from "./Modal";
import { Link, Outlet } from "react-router-dom";
import Essai from "./Essai";


const MovieCard = (props) => {
  const { content } = props;
  const {config, genreListMovie, genreListTv} = useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [genreList, setGenreList] = useState([]);
  
  

  const openModal = () => {
    setOpen(true);
  };

  const pullModalState = (state) => {
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

  const displayTypeIcon = (entries) => {
    if (entries === "Movie") {
      return <TheatersOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
    } else {
      return <TvOutlinedIcon sx={{ fontSize: "0.8rem" }} />;
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

  let idString = content.id.toString();

  return (
    <>
      {/* <Modal
        key={content.id}
        modalState={open}
        element={content}
        genres={genreList}
        getModalState={pullModalState}
      /> */}

      <div className="movie-card">
        <div className="movie-card__header">
          {content.vote_average > 7 ? (
            <DynamicRating
              rate={content.vote_average}
              className="movie-card__header__rating"
            />
          ) : (
            ""
          )}
          <button className="movie-card__header__like-icon">
            <FavoriteTwoToneIcon
              sx={{ color: "rgba(235, 230, 225, 0.944)", fontSize: "1.2rem" }}
            />
          </button>
        </div>
        <Link to={idString} state={{ content, genreList, config }}>
          <div className="movie-card__image--container">
            <p className="movie-card__image--container__type">
              {displayTypeIcon(content.type)}
            </p>

            {handleConfigState() && content.poster_path ? (
              <img
                src={
                  config.base_url + config.poster_sizes[1] + content.poster_path
                }
                alt={"poster of " + content.title}
                onClick={() => {
                  setOpen(true);
                }}
              />
            ) : (
              <div className="movie-card__image--container__default--image">
                <HideImageIcon size="large" sx={{ color: "#fb8c00" }} />
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
