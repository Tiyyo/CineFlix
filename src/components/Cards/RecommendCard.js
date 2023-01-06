import React from "react";

const RecommendCard = (props) => {
  const { content, config } = props;
  const imageFormatUrl = (el, number) => {
    return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
  };
  return (
    <>
      <img
        src={imageFormatUrl(content, 1)}
        alt={"poster of " + content.title || content.original_name}
      />
      <p style={{ color: "teal" }}>{content.title || content.original_name}</p>
    </>
  );
};

export default RecommendCard;
