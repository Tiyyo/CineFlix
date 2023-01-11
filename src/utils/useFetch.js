import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get(url)
        .then((res) => {
          setContent(res.data.results);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(true));
    };
    fetchData();
  }, []);
  content.forEach((el) => {
    console.log(url);
    if (!url.includes("tv")) {
      el.type = "Movie";
    }
    if (url.includes("tv")) {
      el.type = "TvShow";
    }
  });
  return { content, error, loading };
};

export default useFetch;
