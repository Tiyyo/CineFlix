import React, { useState } from "react";
import Trendings from "../../components/Container/Trendings";
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/Cards/MovieCard";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCard from "../../components/Cards/BannerCard";
import Recommendations from "../../components/Container/Recommendations";
import ListByGenre from "../../components/Container/ListByGenre";
import HorizontalCarousel from "../../components/Container/HonrizontalCarousel";

const TvShow2 = () => {
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
          <HorizontalCarousel />
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

export default TvShow2;
