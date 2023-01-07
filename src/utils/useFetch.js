import axios from "axios";
import { useEffect, useState } from "react";

const top =
  "https://api.themoviedb.org/3/discover/movie?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const useFetch = (url) => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url).then((res) => {
        setContent(res.data.results);
      }, []);
    };
  });
  return content;
};

useFetch(top);
