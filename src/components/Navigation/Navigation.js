import axios from "axios";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger";
import Logo from "../Logo/Logo";

const Navigation = () => {
  const topUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

  const useFetch = (url) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(url).then((res) => {
          setContent(res.data.results);
        });
      };
      fetchData();
    }, []);
    return content;
  };

  const top = useFetch(topUrl);
  console.log(top);

  return (
    <div className="nav">
      <Hamburger></Hamburger>
      <ul>
        <NavLink>
          <li></li>
        </NavLink>
        <NavLink>
          <li></li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
