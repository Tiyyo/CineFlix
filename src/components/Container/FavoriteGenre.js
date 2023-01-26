import React, { useEffect, useState, useRef } from "react";
import InfiniteHorizontalCarousel from "./InfiniteHorizontalCarousel";
import { useContext } from "react";
import AppContext from "../../utils/Context/AppContextProvider";

const FavoriteGenre = (props) => {
  const { dataToDisplay } = props;

  const {
    genreListTv: genreTvList,
    genreListMovie: genreMovieList,
    config,
  } = useContext(AppContext);
  let flatGenreLists = [...genreMovieList, ...genreTvList];
  let numberValues = 3;
  let movie = "Movie";
  let tvShow = "TvShow";
  let both = "Both";

  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  const [genres, setGenres] = useState([]);

  const choseRandomValues = (numberValues, referenceGenre) => {
    let indexes = [];
    for (let i = 0; i < numberValues; i++) {
      indexes.push(Math.floor(Math.random() * referenceGenre.length));
    }
    randomValues.current = indexes;
  };

  const matchIndexes = (referenceGenre) => {
    let genre = [];
    randomValues.current.forEach((value) => {
      genre.push(referenceGenre[value]);
    });
    favoriteGenre.current = genre;
  };

  const addTypeBoth = () => {
    favoriteGenre.current.forEach((genre) => {
      for (let i = 0; i < genreMovieList.length; i++) {
        if (genre.id === genreMovieList[i].id) {
          genre.type = movie;
        }
        for (let i = 0; i < genreTvList.length; i++) {
          if (genre.id === genreTvList[i].id) {
            genre.type = tvShow;
          }
        }
      }
    });
  };

  const addMovieType = () => {
    favoriteGenre.current.forEach((genre) => {
      genre.type = movie;
    });
  };

  const addTvShowType = () => {
    favoriteGenre.current.forEach((genre) => (genre.type = tvShow));
  };

  const passDataToState = () => {
    setGenres(favoriteGenre.current);
  };

  useEffect(() => {
    if (dataToDisplay === both) {
      choseRandomValues(numberValues, flatGenreLists);
      matchIndexes(flatGenreLists);
      addTypeBoth();
      passDataToState();
    }
    if (dataToDisplay === movie) {
      choseRandomValues(numberValues, genreMovieList);
      matchIndexes(genreMovieList);
      addMovieType();
      passDataToState();
    }
    if (dataToDisplay === tvShow) {
      choseRandomValues(numberValues, genreTvList);
      matchIndexes(genreTvList);
      addTvShowType();
      passDataToState();
    }
  }, []);

  return (
    <div className="favorite-genre">
      {favoriteGenre.current.map((genre) => (
        <InfiniteHorizontalCarousel key={genre.id} genre={genre} />
      ))}
    </div>
  );
};
export default FavoriteGenre;
