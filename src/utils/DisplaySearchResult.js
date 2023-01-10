import { CloseFullscreen } from "@mui/icons-material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSearch from "./useSearch";

const DisplaySearchResult = (props) => {
  const { content, error, loading, hasMore } = props.search;
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
