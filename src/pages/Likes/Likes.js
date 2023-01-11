import React, { useState } from "react";
import FavoriteList from "../../components/Favorites/FavoriteList";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import ProfileBtn from "../../components/Navigation/ProfileBtn";

const Likes = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="app">
      <div className="header">
        <Navigation />
        <ProfileBtn />
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
