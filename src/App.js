import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Likes from "./pages/Likes/Likes";
import "./app.scss";
import Films from "./pages/Films/Films";
import TvShow from "./pages/TvShow/TvShow";
import Modal from "./components/Cards/Modal";
import AppContextProvider from "./utils/Context/AppContextProvider"
import UserContextProvider from "./utils/Context/UserContextProvider"

const App = () => {
  return (
    <UserContext.Provider>
    <AppContext.Provider>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"*"} element={<Home />} />
        <Route path={"/Home"} element={<Home />}></Route>
        <Route path="/Likes" element={<Likes />}></Route>
        <Route path="/Films" element={<Films />}></Route>
        <Route path="/TvShow" element={<TvShow />}></Route>
        <Route path={`/:id/:id`} element={<Modal />} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
