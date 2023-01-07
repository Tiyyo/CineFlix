import axios from "axios";
import { useEffect, useState } from "react";


fonction useFetch (url, setLoading) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url).then((res) => {
        setContent(res.data.results)
        setLoading(true);
      }).catch((error) => console.log(error), []);
    };
  });
  return content;
};

export default useFetch;
