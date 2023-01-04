import React, { useState } from "react";
import Trendings from "../../components/Genre/Trendings";
import LastestReleases from "../../components/LastestRelease/LastestReleases";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/moviecard/BannerCard";
import MovieCard from "../../components/moviecard/MovieCard";
import Recommendations from "../../components/Recommendations/Recommendations";
import ListByGenre from "../../components/Genre/ListByGenre";

const Films = () => {
  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const favoriteGenre = [];

  return (
    <div>
      <div className="header">
        <Navigation></Navigation>
        <SearchBar />
      </div>
      {searchIsActive ? (
        <div className="search--result"></div>
      ) : loading ? (
        <div className="loader--container">
          <Loader />
        </div>
      ) : (
        <div className="main--content">
          <Trendings>
            <BannerCard />
          </Trendings>
          <LastestReleases />
          <Recommendations>
            <MovieCard />
          </Recommendations>
          {favoriteGenre.map((genre) => {
            return <ListByGenre key={genre} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Films;
