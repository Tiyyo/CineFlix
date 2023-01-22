import React from "react";

const Spacer = (props) => {
  const { imageHeaderHeight } = props;

  return (
    <div
      className="spacer"
      style={{ height: `${imageHeaderHeight - 100}px` }}
    ></div>
  );
};

export default Spacer;
