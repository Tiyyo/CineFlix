import React, { useEffect, useState, useRef } from "react";
import InfiniteHorizontalCarousel from "./InfiniteHorizontalCarousel";
import axios from "axios";

const FavoriteGenre = (props) => {
  const {
    genreListTv: genreTvList,
    genreListMovie: genreMovieList,
    dataToDisplay,
  } = props;
  let flatGenreLists = [...genreMovieList, ...genreTvList];
  let numberValues = 3;
  let movie = "Movie";
  let tvShow = "TvShow";
  let both = "Both";
  console.log(dataToDisplay);

  const randomValues = useRef([]);
  const favoriteGenre = useRef([]);

  const [genres, setGenres] = useState([]);
  const [config, setConfig] = useState([]);

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
      console.log(genre);
    });
    favoriteGenre.current = genre;
  };

  const addTypeBoth = () => {
    favoriteGenre.current.forEach((genre) => {
      for (let i = 0; i < genreMovieList.length; i++) {
        console.log(genre.id, genreMovieList[i].id, "movie");
        if (genre.id === genreMovieList[i].id) {
          genre.type = movie;
        }
        for (let i = 0; i < genreTvList.length; i++) {
          console.log(genre.id, genreTvList[i].id, "tvshow");
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

  return (
    <div className="favorite-genre">
      {favoriteGenre.current.map((genre) => (
        <InfiniteHorizontalCarousel
          key={genre.id}
          genre={genre}
          config={config}
          genreListMovie={genreMovieList}
          genreListTv={genreTvList}
        />
      ))}
    </div>
  );
};
export default FavoriteGenre;
