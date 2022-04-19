import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlayListContent.css";

const PlayListContent = ({ video, handleDeleteVideoFromPlayList }) => {
  const navigate = useNavigate();

  function handleDelete(e) {
    e.stopPropagation();
    handleDeleteVideoFromPlayList(video._id);
  }

  return (
    <div
      className="playlist-content-container"
      onClick={() => navigate(`/videos/${video._id}`)}
    >
      <div>
        <img
          className="playlist-content-thumnail"
          src={video.thumbnail}
          alt="video image"
        />
      </div>

      <div className="playlist-content-video-details">
        <p className="playlist-content-video-title">{video.title}</p>
        <span className="video-creator">{video.creator}</span>
      </div>

      <div className="delete-playlist-button" title="delete from playlist">
        <button
          className="btn btn-float btn-danger-outline btn-small"
          onClick={handleDelete}
        >
          <span class="material-icons md-24">delete</span>
        </button>
      </div>
    </div>
  );
};

export default PlayListContent;
