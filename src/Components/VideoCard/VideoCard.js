import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  return (
    <div className="videoCard" onClick={() => navigate(`/videos/${video._id}`)}>
      <div className="video-thumbnail">
        <img className="video-img" src={video.thumbnail} alt={video.title} />
        <div className="video-tools">
          <span className="tool">
            <span class="material-icons md-24">thumb_up</span>
            <span>Like</span>
          </span>
          <span className="tool">
            <span class="material-icons md-24">watch_later</span>
            <span>Watch later</span>
          </span>
          <span className="tool">
            <span class="material-icons md-24">playlist_add</span>
            <span>Add to playlist</span>
          </span>
        </div>
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
