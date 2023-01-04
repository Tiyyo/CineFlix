import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import "./app.scss";
import Films from "./pages/Films/Films";
import TvShow from "./pages/TvShow/TvShow";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"*"} element={<Home />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/Films" element={<Films />} />
        <Route path="/TvShow" element={<TvShow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
