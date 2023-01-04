import React from "react";

const Likes = () => {
  return <div>
            <div className="header">
              <Navigation />
            </div>
           { loading ? ( <Loader /> ) : 
           ( <div className="main">
              <FavoriteMovies />
              <FavoriteTvShow />
            </div> )
            }         
        </div>;
};

export default Likes;
