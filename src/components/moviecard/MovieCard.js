import Loader from "../Loader/Loader";

const MovieCard = ({ props }) => {
  const { movie, config } = props;

  const handleConfigState = () => {
    if (config.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <li className="movie-card">
      {handleConfigState() ? (
        <img
          src={config.base_url + config.poster_sizes[1] + movie.poster_path}
          alt={"poster of " + movie.title}
        />
      ) : (
        <Loader />
      )}
      <h3>{props.movie.title}</h3>
      <div></div>
    </li>
  );
};

export default MovieCard;
