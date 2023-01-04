import React from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "../hamburger/Hamburger";
import Logo from "../Logo/Logo";

const Navigation = () => {
  return (
    <div className="nav">
      <Hamburger></Hamburger>
      <ul>
        <NavLink>
          <li></li>
        </NavLink>
        <NavLink>
          <li></li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
