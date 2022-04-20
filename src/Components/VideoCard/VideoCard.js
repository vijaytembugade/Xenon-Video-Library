import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLikedVideo } from "../../Contexts";
import { addToLike, removeFromLike } from "../../Services";
import PlaylistModal from "../PlayListModal/PlaylistModal";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const {
    state: { isLoggedIn, token },
  } = useAuth();

  const { likedVideos, setLikedVideos } = useLikedVideo();
  const isLikedVideo = likedVideos.find((likedVideo) =>
    likedVideo._id === video._id ? true : false
  );
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
  return (
    <div className="videoCard" onClick={() => navigate(`/videos/${video._id}`)}>
      <div className="video-thumbnail">
        <img
          loading="lazy"
          className="video-img"
          src={video.thumbnail}
          alt={video.title}
        />
        <div className="video-tools">
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
          <span className="tool">
            <span className="material-icons md-24">watch_later</span>
            <span>Watch later</span>
          </span>
          <span className="tool" onClick={handlePlayList}>
            <span className="material-icons md-24">playlist_add</span>
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
