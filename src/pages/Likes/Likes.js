import React, { useState } from "react";
import FavoriteList from "../../components/Favorites/FavoriteList";
import Loader from "../../components/Loader/Loader";
import Avatar from "../../components/Navigation/Avatar";
import Navigation from "../../components/Navigation/Navigation";

const Likes = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <div className="header">
        <Navigation />
        <Avatar />
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
