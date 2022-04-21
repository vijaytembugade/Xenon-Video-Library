import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLikedVideo } from "../../Contexts";
import { addToLike, removeFromLike } from "../../Services";
import PlaylistModal from "../PlayListModal/PlaylistModal";
import "./VideoDescription.css";

const VideoDescription = ({ video }) => {
  const {
    state: { isLoggedIn, token },
  } = useAuth();
  const [showPlayListModal, setShowPlayListModal] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { likedVideos, setLikedVideos } = useLikedVideo();
  const isLikedVideo = likedVideos.find((likedVideo) =>
    likedVideo._id === video._id ? true : false
  );

  async function handleLike(e) {
    e.stopPropagation();
    try {
      if (isLoggedIn) {
        const response = await addToLike(video, token);
        if (response !== undefined && response.status === 201) {
          setLikedVideos(response.data.likes);
          toast("Video liked!", {
            icon: "👍",
          });
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        navigate("/login", { state: { from: pathname } });
        throw new Error("You are not logged in, Please Login!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDisLike(e) {
    e.stopPropagation();
    try {
      if (isLoggedIn) {
        const response = await removeFromLike(video._id, token);
        console.log(response);
        if (response !== undefined && response.status === 200) {
          setLikedVideos(response.data.likes);
          toast("video removed from likes!", {
            icon: "👎",
          });
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        navigate("/login", { state: { from: pathname } });
        throw new Error("You are not logged in, Please Login!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

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
    <div className="video-description-container">
      <p className="title">{video.title}</p>

      <div className="video-toolbar">
        <div>
          <span
            className="tool "
            onClick={
              isLikedVideo?._id === video._id ? handleDisLike : handleLike
            }
          >
            <span
              className={
                isLikedVideo && isLikedVideo._id === video._id
                  ? "material-icons md-24 danger-text"
                  : "material-icons md-24"
              }
            >
              thumb_up
            </span>
            <span>Like</span>
          </span>
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
