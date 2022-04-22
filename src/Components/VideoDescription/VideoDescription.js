import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLikedVideo, useWatchLater } from "../../Contexts";
import {
  addToLike,
  addToWatchLaterService,
  removeFromLike,
  removeFromWatchLaterService,
} from "../../Services";
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
  const { watchLaterVideos, setWatchLaterVideos } = useWatchLater();

  const isInWatchLater = watchLaterVideos.find((watchLaterVideo) =>
    watchLaterVideo._id === video._id ? true : false
  );

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

  async function handleAddToWatchLater(e) {
    e.stopPropagation();
    try {
      if (isLoggedIn) {
        const response = await addToWatchLaterService(video, token);
        if (response !== undefined && response.status === 201) {
          setWatchLaterVideos(response.data.watchlater);
          toast.success("video added in watch later!");
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

  async function handleRemoveFromWatchLater(e) {
    e.stopPropagation();
    try {
      if (isLoggedIn) {
        const response = await removeFromWatchLaterService(video._id, token);
        if (response !== undefined && response.status === 200) {
          setWatchLaterVideos(response.data.watchlater);
          toast.success("video removed from watch later!");
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
          <span
            className="tool"
            onClick={
              isInWatchLater?._id === video._id
                ? handleRemoveFromWatchLater
                : handleAddToWatchLater
            }
          >
            <span
              className={
                isInWatchLater && isInWatchLater._id === video._id
                  ? "material-icons md-24 danger-text"
                  : "material-icons md-24"
              }
            >
              watch_later
            </span>
            <span>Watch later</span>
          </span>
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
