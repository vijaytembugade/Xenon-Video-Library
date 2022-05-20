import React from "react";
import "./PlayListShowCard.css";

const PlayListShowCard = ({ title, image }) => {
  return (
    <div className="playlist-card">
      <img
        src={image ? image : "/assets/playlist/pl-default.webp"}
        alt="playlist-card"
      />
      <span>{title}</span>
    </div>
  );
};

export default PlayListShowCard;
