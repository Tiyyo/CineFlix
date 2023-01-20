import React, { useEffect, useState } from "react";
import PromotedCard from "../Cards/PromotedCard";

const Promoted = (props) => {
  const { content, config } = props;
  const [randomIndexElement, setRandomIndex] = useState(0);

  let numberElementDisplayed = 1;
  const pickRandomNumber = () => {
    if (randomIndexElement < 0) {
      return setRandomIndex(1);
    } else {
      return setRandomIndex(Math.floor(Math.random() * (content.length - 1)));
    }
  };

  useEffect(() => {
    pickRandomNumber();
  }, [content]);

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
