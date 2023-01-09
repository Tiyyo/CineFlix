import { CloseFullscreen } from "@mui/icons-material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSearch from "./useSearch";

const DisplaySearchResult = (props) => {
  const { content, error, loading, hasMore } = props.search;
  console.log(props);

  const observer = useRef();
  const lastContentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          props.getPageNumber(1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //   const fetchData = async () => {
  //     const result = await axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${inputValue}&page=1&include_adult=false`
  //       )
  //       .then((res) => {
  //         setTotalPages(res.data.total_pages);
  //         currentResult.push(...res.data.results);
  //       });

  //     for (let i = 2; i < nTotalPages; i++) {
  //       const fetchDataPages = async () => {
  //         const resultTwo = await axios
  //           .get(
  //             `https://api.themoviedb.org/3/search/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${inputValue}&page=${i}&include_adult=false`
  //           )
  //           .then((res) => {
  //             currentResult.push(...res.data.results);
  //           });
  //       };
  //       fetchDataPages();
  //     }
  //     setSearchResult(currentResult);
  //   };

  //   useEffect(() => {
  //     fetchData();
  //     console.log(searchResult);
  //   }, []);

  // useEffect(() => {
  //   const fetchDataMovies = async () => {
  //     const results = inputValue
  //       ? await axios
  //           .get(
  //             `https://api.themoviedb.org/3/search/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&query=${inputValue}&include_adult=false`
  //           )
  //           .then((res) => setSearchedMovie(res.data.results))
  //       : "";
  //   };
  //   fetchDataMovies();
  // }, [inputValue]);

  return (
    <div className="search--result__wrapper">
      {content.map((el, index) => {
        if (index === content.length - 1) {
          return (
            <h2 key={el.id} ref={lastContentRef}>
              {el.title || el.name} + ref
            </h2>
          );
        } else {
          return <h2 key={el.id}>{el.title || el.name}</h2>;
        }
      })}
      {/* {content.map((el, index) => {
        el.length === index + 1 ? (
          <li
            style={{ color: "white", listStyleType: "none" }}
            className="searchCard"
            key={el.id}
            ref={lastContentRef}
          >
            <h4>{el.title}</h4>
            <p className="release-date">Release at {el.release_date}</p>
          </li>
        ) : (
          <li
            style={{ color: "white", listStyleType: "none" }}
            className="searchCard"
            key={el.id}
          >
            <h4>{el.title}</h4>
            <p className="release-date">Release at {el.release_date}</p>
          </li>
        );
      })} */}
    </div>
  );
};

export default DisplaySearchResult;
