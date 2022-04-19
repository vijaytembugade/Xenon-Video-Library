import React, { useState } from "react";
import PlaylistModal from "../PlayListModal/PlaylistModal";
import "./VideoDescription.css";

const VideoDescription = ({ video }) => {
  const [showPlayListModal, setShowPlayListModal] = useState(false);

  function handlePlayList(e) {
    e.stopPropagation();
    setShowPlayListModal(true);
  }
  return (
    <div className="video-description-container">
      <p className="title">{video.title}</p>

      <div className="video-toolbar">
        <div>
          <span class="material-icons">thumb_up</span>
          <span>Like</span>
        </div>
        <div>
          <span class="material-icons">watch_later</span>
          <span>Watch Later</span>
        </div>
        <div onClick={handlePlayList}>
          <span class="material-icons">playlist_add</span>
          <span>Add to playlist</span>
        </div>
      </div>

      <p>
        <strong>{video.creator}</strong>
        <span class="material-icons md-18">check_circle</span>
      </p>
      <h4>Description</h4>
      <em>{video.description}</em>
      {showPlayListModal && (
        <PlaylistModal
          setShowPlayListModal={setShowPlayListModal}
          video={video}
        />
      )}
    </div>
  );
};

export default VideoDescription;
