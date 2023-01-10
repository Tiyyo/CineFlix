import React, { useState } from "react";
import "./hamburgers.css";

const Hamburger = (props) => {
  const [btnState, setBtnState] = useState(false);
  const hamburgerBtn = document.querySelector(".hamburger");

  const handlebtnState = () => {
    if (btnState === false) {
      hamburgerBtn.classList.add("is-active");
      props.getOpenState(true);
    } else {
      hamburgerBtn.classList.remove("is-active");
      props.getOpenState(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        btnState ? setBtnState(false) : setBtnState(true);
        handlebtnState();
      }}
      className="hamburger hamburger--spring"
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Hamburger;
