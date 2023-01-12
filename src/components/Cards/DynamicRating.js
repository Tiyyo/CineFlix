import React from "react";

const DynamicRating = (props) => {
  const { rate: score } = props;
  //- determine the ration for progress bar animation
  let y = 360 * (1 - score / 10);

  return (
    <div className="progress-card">
      <div
        className="progress-circle"
        style={{
          background: `conic-gradient(rgba(91, 86, 86, 0.435) ${y}deg , rgba(98,245,12,1) 0deg, rgb(255 242 10) 110deg, rgb(215 106 26) 200deg,rgb(251 10 10) 290deg )`,
        }}
      >
        <p className="progress-text">{score * 10}%</p>
      </div>
    </div>
  );
};

export default DynamicRating;
