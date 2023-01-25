import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import "./app.scss";
import Films from "./pages/Films/Films";
import TvShow from "./pages/TvShow/TvShow";
import Modal from "./components/Cards/Modal";
import { Login } from "./pages/Login/Login";
import AddToPlaylist from "./pages/Likes/AddToPlaylist";

const App = () => {
  const [data, setData] = useState(["Data"]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"*"} element={<Home />} state={data} />
        <Route path={"/Home"} element={<Home />}></Route>
        <Route path="/Likes" element={<Likes />}></Route>
        <Route path="/Films" element={<Films />}></Route>
        <Route path="/TvShow" element={<TvShow />}></Route>
        <Route path={`/:id/:modalid`} element={<Modal />} />
        <Route path={"/:id/:id/add_to_playlist"} element={<AddToPlaylist />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
