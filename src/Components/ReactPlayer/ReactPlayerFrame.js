import React from "react";
import ReactPlayer from "react-player/youtube";
import "./ReactPlayerFrame.css";

const ReactPlayerFrame = ({ video }) => {
  return (
    <div className="player">
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        controls={true}
        url={`https://www.youtube.com/watch?v=${video._id}`}
      />
    </div>
  );
};

export default ReactPlayerFrame;
