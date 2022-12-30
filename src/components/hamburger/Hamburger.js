import React from "react";
import "./hamburgers.scss";

const Hamburger = () => {
  return (
    <button class="hamburger hamburger--spring" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Hamburger;
