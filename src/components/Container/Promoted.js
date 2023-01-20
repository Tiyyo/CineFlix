import React from "react";
import PromotedCard from "../Cards/PromotedCard";

const Promoted = (props) => {
  const { content, config } = props;

  let randomIndexElement = Math.floor(Math.random() * (content.length - 1));
  let numberElementDisplayed = 1;

  console.log(randomIndexElement);

  return (
    <div className="promoted">
      {content
        .filter((el) => el.backdrop_path)
        .slice(randomIndexElement, randomIndexElement + numberElementDisplayed)
        .map((el) => {
          return <PromotedCard content={el} config={config} />;
        })}
    </div>
  );
};

export default Promoted;
