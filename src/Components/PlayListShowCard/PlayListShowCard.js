import React from "react";
import "./PlayListShowCard.css";

const PlayListShowCard = ({ title, image }) => {
  console.log(image);
  return (
    <div className="playlist-card">
      <img src={image ? image : "/assets/playlist/pl-default.webp"} alt="" />
      <span>{title}</span>
    </div>
  );
};

export default PlayListShowCard;
