import { RepartitionRounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useDetails = (type, id) => {
  const [data, setData] = useState([]);

  let filmVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let filmSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let filmCreditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let filmsUrl = [filmVideoUrl, filmSimilarUrl, filmCreditsUrl];

  let tvVideoUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvCreditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR`;

  let tvSimilarUrl = `
  https://api.themoviedb.org/3/tv/${id}/similar?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=fr-FR&page=1`;

  let tvShowUrls = [tvVideoUrl, tvCreditsUrl, tvSimilarUrl];

  let tryToFix = [];

  const getAllData = (urlList) => {
    setData([]);
    return Promise.all(urlList.map(fetchData));
  };

  const fetchData = async (url) => {
    setData([]);
    const result = await axios
      .get(url)
      .then((res) => {
        tryToFix.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setData(null);
    if (type === "Movie" && data.length < 4) {
      getAllData(filmsUrl);
    } else {
      return;
    }
    if (type === "TvShow") {
      getAllData(tvShowUrls);
    }
  }, [type, id]);

  return data;
};

export default useDetails;
