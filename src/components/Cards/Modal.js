import React from "react";
import Navigation from "../Navigation/Navigation";

const Modal = (props) => {
  const { content, type } = props;
  return (
    <div className="modal">
      <main class="card">
        <div class="card__header">
          <button class="card__header__return-btn">
            <div class="icon-return">R</div>
          </button>
          <div class="card__header__search-bar">
            <div class="icon-search">Search</div>
          </div>
          <div class="card__header__avatar">
            <div class="avatar-image">A</div>
          </div>
        </div>

        <div class="card__trailer-container">
          <div class="player">Player</div>
        </div>
        <div class="card__title">Titre</div>
        <div class="card__infos">
          <div class="card__infos__type">Movie</div>
          <div class="card__infos__release-year">2022</div>
          <div class="card__infos__genres">
            <div class="genre">Genre</div>
            <div class="genre">Genre</div>
            <div class="genre">Genre</div>
          </div>
          <div class="card__infos__rating">7.8</div>
        </div>
        <div class="card__synopsis">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="card__actor">Avec: Actor Name, Actor Name, Actor Name</div>
        <div class="card__call-to-action">
          <div className="card__call-to-action__favorite"></div>
          <div className="card__call-to-action__share"></div>
        </div>
      </main>
    </div>
  );
};

export default Modal;
