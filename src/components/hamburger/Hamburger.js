import React from "react";
import "./hamburgers.scss";

const Hamburger = () => {
  return (
    <button className="hamburger hamburger--spring" type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Hamburger;
