import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  return (
    <div className="videoCard" onClick={() => navigate(`/videos/${video._id}`)}>
      <div className="video-thumbnail">
        <img className="" src={video.thumbnail} alt={video.title} />
      </div>
      <div className="video-title">
        <span className="title" maxLength={10}>
          {video.title}
        </span>
      </div>
      <div className="video-creator">
        <span>{video.creator}</span>
        <span class="material-icons md-18">check_circle</span>
      </div>
    </div>
  );
};

export default VideoCard;
