import { config } from "@fortawesome/fontawesome-svg-core";
import { CloseFullscreen } from "@mui/icons-material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSearch from "./useSearch";

const DisplaySearchResult = (props) => {
  const { content, error, loading, hasMore } = props.search;
  const config = props.config;
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
            <Link key={el.id.toString()} to={el.id} state={{ el: content }}>
              <h2 key={el.id} ref={lastContentRef}>
                {el.title || el.name} + ref
              </h2>
            </Link>
          );
        } else {
          return (
            <Link key={el.id} to={el.id.toString()}>
              {config && el.poster_path ? (
                <img
                  src={config.base_url + config.logo_sizes[1] + el.poster_path}
                  alt={"poster of " + el.name || el.title}
                />
              ) : (
                <h2 key={el.id}>{el.title || el.name}</h2>
              )}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default DisplaySearchResult;
