import React from "react";

const truncateText = (words, maxlength) => {
  return `${words ? words.slice(0, maxlength) : ""} …`;
};

export default truncateText;
