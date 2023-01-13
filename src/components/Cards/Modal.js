import axios from "axios";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import { Avatar } from "@mui/material";
import { Player } from "video-react";
import { StarOutline } from "@mui/icons-material";
import useDetails from "../../utils/useDetails";

const Modal = (props) => {
  const content = props.element;
  const genreList = props.genres;
  const modalState = props.modalState;
  const getModalState = props.getModalState;
  const { id, genre_ids, type, video } = content;
  const [data, setData] = useState([]);
  const [casts, setCats] = useState([]);

  const details = useDetails(type, id);

  const displayGenreMovie = (arrGenres, genreList) => {
    let movieGenreNames = [];
    arrGenres.forEach((genre) => {
      genreList.forEach((el) => {
        if (el.id == genre) {
          movieGenreNames.push(el.name);
        }
      });
    });
    return movieGenreNames.map((genreName) => {
      return (
        <span key={content.name} className="genre">
          {genreName}
        </span>
      );
    });
  };

  console.log(details);

  const displayCastsActors = () => {
    return (
      <div className="actors">
        <span>Avec :</span> Actors goes Here
      </div>
    );
  };
  const displayCastsDirectors = () => {
    return (
      <div className="directors">
        <span>De :</span> Directors goes Here
      </div>
    );
  };

  const displayCasts = () => {
    displayCastsActors();
    displayCastsDirectors();

    return (
      <div>
        <div>displayCastsActors()</div>
        <div>displayCastsDirectors()</div>;
      </div>
    );
  };

  useEffect(() => {
    setData(details);
  }, [id, type]);

  return (
    <div
      className="modal"
      style={modalState ? { display: "flex" } : { display: "none" }}
    >
      <main className="card">
        <div className="card__header">
          <button
            className="card__header__return-btn"
            onClick={() => {
              getModalState(false);
            }}
          >
            <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
          </button>
          <div className="card__header__avatar">
            <Avatar sx={{ color: "orange", backgroundColor: "transparent" }} />
          </div>
        </div>

        <div className="card__trailer-container">
          <div className="player">
            {/* <Player
              fluid={true}
              muted={true}
              aspectRatio="4:3"
              autoPlay={true}
              src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            ></Player> */}
          </div>
        </div>
        <div className="card__title">{content.title}</div>
        <div className="card__infos">
          <div className="card__infos__type">{content.type}</div>
          <div className="card__infos__release-year">
            {content.release_date ? content.release_date.substring(0, 4) : ""}
          </div>
          <div className="card__infos__genres">
            {displayGenreMovie(content.genre_ids, genreList)}
          </div>
          <div className="card__infos__rating">
            <StarOutline sx={{ color: "yellow" }} />
            {content.vote_average} / 10{" "}
          </div>
        </div>
        <div className="card__synopsis">{content.overview}</div>
        <div className="card__actors">{displayCasts()}</div>
        <div className="card__call-to-action">
          <div className="card__call-to-action__favorite"></div>
          <div className="card__call-to-action__share"></div>
        </div>
      </main>
    </div>
  );
};

export default Modal;
