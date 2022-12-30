import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieCard = ({ props }) => {
  const { movie, config } = props;

  const handleConfigState = () => {
    if (config.length === 0) {
      console.log("salut");
      return false;
    } else {
      console.log("dont worry");
      return true;
    }
  };
  // console.log(props);
  // console.log(config);
  //   const [configImages, setConfigImages] = useState([]);
  //   useEffect(() => {
  //     setConfigImages(config);
  //   }, []);

  // useEffect(() => {
  //   console.log(movie);
  // }, [props]);

  return (
    <li className="movie-card">
      {handleConfigState() ? (
        <img
          src={config.base_url + config.poster_sizes[1] + movie.poster_path}
          alt={"poster of " + movie.title}
        />
      ) : (
        console.log("Salut salut")
      )}
      <h3>{props.movie.title}</h3>
      <div>
        <FontAwesomeIcon icon="fa-ligth fa-heart" />
      </div>
    </li>
  );
};

export default MovieCard;
