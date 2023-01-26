import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AddToPlaylist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="add-to-playlist">
      <Outlet />
      <header>
        <div className="return-btn" onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ color: "#fb8c00" }} />
        </div>
        <h4 className="title">Add to a list </h4>
        <div className="avatar"></div>
      </header>
      <button className="new-playlist">Create a new list</button>

      <div className="playlists">
        {/* <Link to={name}> */}
        <div className="playlist">
          <h4 className="name">Ma liste de Film a voir</h4>
          <button className="add">
            <AddIcon sx={{ color: "white" }} />
          </button>
          <button className="delete">
            <CloseIcon sx={{ color: "white" }} />
          </button>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default AddToPlaylist;
