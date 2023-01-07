import { motion } from "framer-motion";
import React from "react";

const RecommendCard = (props) => {
  const { content, config } = props;
  const imageFormatUrl = (el, number) => {
    return config.base_url + config.backdrop_sizes[number] + el.backdrop_path;
  };
  return (
    <>
      <motion.div className="recommend-card">
        <img
          src={imageFormatUrl(content, 0)}
          alt={"poster of " + content.title || content.original_name}
        />
        <p>{content.title || content.original_name}</p>
      </motion.div>
    </>
  );
};

export default RecommendCard;
