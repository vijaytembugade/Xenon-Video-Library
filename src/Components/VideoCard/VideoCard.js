import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts";
import PlaylistModal from "../PlayListModal/PlaylistModal";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const {
    state: { isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showPlayListModal, setShowPlayListModal] = useState(false);

  function handlePlayList(e) {
    e.stopPropagation();
    isLoggedIn
      ? setShowPlayListModal(true)
      : navigate("/login", { state: { from: pathname } });

    !isLoggedIn &&
      toast("Please Login!", {
        icon: "😊",
      });
  }
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
          <span className="tool" onClick={handlePlayList}>
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
      {showPlayListModal && (
        <PlaylistModal
          setShowPlayListModal={setShowPlayListModal}
          video={video}
        />
      )}
    </div>
  );
};

export default VideoCard;
