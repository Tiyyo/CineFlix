import axios from "axios";
import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Avatar, createTheme, ThemeProvider } from "@mui/material";
import { StarOutline } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

const Modal = () => {
  //--- Destructuring
  const location = useLocation();
  const { content, genreList, config } = location.state;
  const { id, genre_ids, type } = content;
  const params = useParams();

  //-- Const and var
  let filmVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let filmSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let filmCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let filmsUrl = [filmVideoUrl, filmCreditsUrl, filmSimilarUrl];

  let tvVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvSimilarUrl = `
  https://api.themoviedb.org/3/tv/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let tvShowUrls = [tvVideoUrl, tvCreditsUrl, tvSimilarUrl];

  let role = "Director";

  //--Others Hook
  const navigate = useNavigate();

  //--- State Hook
  const [credits, setCredits] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [videos, setVideos] = useState([]);
  const [castToDisplay, setCastToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [directors, setDirectors] = useState("");
  const [synopsisIsOpen, setSynopsisIsOpen] = useState(false);

  //--Function
  const displayGenreMovie = (arrGenres, genreList) => {
    let movieGenreNames = [];
    arrGenres.forEach((genre) => {
      genreList.forEach((el) => {
        if (el.id == genre) {
          movieGenreNames.push(el.name);
        }
      });
    });
    return movieGenreNames.map((genreName, index) => {
      return (
        <span key={index} className="genre">
          {genreName}
        </span>
      );
    });
  };

  const getDetails = async (querys) => {
    axios
      .all(querys.map((url) => axios.get(url)))
      .then(
        axios.spread((video, credit, similar) => {
          setVideos(video.data);
          setCredits(credit.data);
          setSimilars(similar.data.results);
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("i fire once in Modal");
    if (type === "Movie") {
      getDetails(filmsUrl);
    }
    if (type === "TvShow") {
      getDetails(tvShowUrls);
    }
  }, []);

  const displayCastsActors = () => {
    if (loading) {
      return;
    } else if (credits.cast.length > 0) {
      let castToDisplay2 = credits.cast.slice(0, 3);
      return (
        <div className="actors">
          <span>Avec : </span>
          {castToDisplay2.map((person) => {
            return (
              <span key={person.id} className="actor">
                {person.name}
              </span>
            );
          })}
        </div>
      );
    }
  };

  const displayCastsDirectors = () => {
    if (loading) {
      return;
    } else if (credits.crew.length > 2) {
      const { cast, crew, id } = credits;
      let mainDirector = [];
      for (let i = 0; i < crew.length; i++) {
        if (crew[i].job === role) {
          mainDirector.push(crew[i]);
        }
      }
      return (
        <div className="directors">
          <span>De : </span>
          {mainDirector.map((director) => {
            return <span className="director">{director.name}</span>;
          })}
        </div>
      );
    }
  };

  const displayCasts = () => {
    displayCastsActors();
    displayCastsDirectors();

    return (
      <>
        {displayCastsDirectors()}
        {displayCastsActors()}
      </>
    );
  };

  const toggleSynopsis = () => {
    synopsisIsOpen ? setSynopsisIsOpen(false) : setSynopsisIsOpen(true);
    console.log("working");
  };

  const displaySimilarContent = () => {
    if (loading) {
      return;
    } else {
      let contentToDisplay = similars.slice(0, 12);
      return (
        <div className="similar-content__wrapper">
          {contentToDisplay.map((element) => {
            return (
              <>
                <img
                  src={
                    config.base_url + config.logo_sizes[1] + element.poster_path
                  }
                  alt={"logo of" + element.name || element.title}
                />
              </>
            );
          })}
        </div>
      );
    }
  };

  const displayVideo = () => {
    if (!loading) {
      return <div>Something Goes Here</div>;
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

  return (
    <>
      <div className="modal" style={{ display: "flex" }}>
        <main className="card">
          <div className="card__header">
            <button
              className="card__header__return-btn"
              onClick={() => navigate(-1)}
            >
              <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
            </button>
            <div className="card__header__avatar">
              <Avatar
                sx={{ color: "orange", backgroundColor: "transparent" }}
              />
            </div>
          </div>
          <div className="card__trailer-container">
            <div className="player">{displayVideo()}</div>
          </div>
          <div className="card__call-to-action">
            <ThemeProvider theme={theme}>
              <div className="card__call-to-action__favorite">
                <BookmarkBorderIcon />
              </div>
              <div className="card__call-to-action__share">
                <ShareIcon />
              </div>
            </ThemeProvider>
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
          <div className="card__synopsis">
            <div
              className="card__synopsis--container"
              style={
                synopsisIsOpen
                  ? { maxHeight: "fit-content" }
                  : { maxHeight: "62px" }
              }
            >
              {content.overview}
            </div>
            <span onClick={toggleSynopsis}>
              {" "}
              ...<span>{synopsisIsOpen ? "Reduce" : "See More"}</span>
            </span>
          </div>

          <div className="card__casting">{credits ? displayCasts() : ""}</div>
          <div className="card__similar--content">
            {displaySimilarContent()}
          </div>
        </main>
      </div>
    </>
  );
};

export default Modal;
