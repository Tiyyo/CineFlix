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
  return { content, error, loading };
};

export default useFetch;
