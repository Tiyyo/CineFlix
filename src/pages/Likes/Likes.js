import React, { useState } from "react";
import FavoriteList from "../../components/Favorites/FavoriteList";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";

const Likes = () => {
  const [searchIsActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="header">
        <Navigation />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <FavoriteList />
          <FavoriteList />
        </div>
      )}
    </div>
  );
};

export default Likes;
