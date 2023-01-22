import React, { useEffect, useState, useRef } from "react";
import InfiniteHorizontalCarousel from "./InfiniteHorizontalCarousel";

const FavoriteGenre = (props) => {
  const { genreLists } = props;
  const { 0: genreMovieList, 1: genreTvList } = genreLists;
  let flatGenreLists = [...genreMovieList, ...genreTvList];
  let numberValues = 3;

  const [randomValues, setRandomValues] = useState();
  const [random, setRandom] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState([]);

  const choseRandomValues = (numberValues) => {
    let indexes = [];
    for (let i = 0; i < numberValues; i++) {
      indexes.push(Math.floor(Math.random() * flatGenreLists.length));
    }
    console.log(indexes);
    setRandom("indexes");
    console.log(random);
  };

  // const matchIndexes = () => {
  //   console.log(flatGenreLists);
  //   randomValues.forEach((value) => {
  //     console.log("working");
  //     setFavoriteGenre((prevFavoriteGenre) => {
  //       return [...prevFavoriteGenre, flatGenreLists[value]];
  //     });
  //   });
  // };

  const addType = () => {
    console.log(favoriteGenre);
  };

  const movieOrTv = () => {
    let genre;
    console.log(randomValues);
    console.log(genreLists);
    randomValues.forEach((value) => {
      for (let i = 0; i < genreMovieList.length - 1; i++) {
        if (value === genreMovieList[i].id) {
          let obj = {
            name: genreMovieList[i].name,
            type: "Movie",
          };
          console.log(obj);
        }
      }
      for (let i = 0; i < genreTvList.length - 1; i++) {
        if (value === genreTvList[i].id) {
          let obj = {
            name: genreTvList[i].name,
            type: "TvShow",
          };
          console.log(obj);
        }
      }
    });
  };

  // const pickRandomGenre = () => {
  //    let indexes = []
  //   for (let i = 0; i < 3 ; i++ ) {
  //   indexes.push(Math.floor(Math.random() * genreList.length - 1))
  // }
  // indexes.forEach((index) => {
  //      setFavoriteGenre((prevFavoriteGenre) => {
  //      return [...prevFavoriteGenre, genreList[index]
  //      } )
  // })
  // }
  //     const fetchGenreList = async () => {
  //       const result = await axios
  //         .get(
  //           "https://api.themoviedb.org/3/genre/movie/list?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR"
  //         )
  //         .then((res) => setGenreList(res.data.genres));
  //     };
  //     fetchGenreList();
  //   }, []);

  useEffect(() => {
    choseRandomValues(numberValues);
    // matchIndexes();
    console.log(favoriteGenre);
  }, [numberValues]);
  // return <InfiniteHorizontalCarousel />;
  return <div style={{ color: "white" }}> Luv you more ... moooore </div>;
};
export default FavoriteGenre;
