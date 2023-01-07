import axios from "axios";
import { useEffect, useState } from "react";


fonction useFetch (url) {
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

export default useFetch;
