import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PlayListContent from "../../Components/PlayListContent/PlayListContent";
import { SET_PLAYLIST } from "../../Constants";
import { useAuth, usePlayList } from "../../Contexts";
import {
  deletePlaylistService,
  deleteVideoFromPlaylistService,
  getPlayListByIdService,
  getPlayListDetailsService,
} from "../../Services";
import "./PlayListDetails.css";

const PlayListDetails = () => {
  const { playListId } = useParams();
  const navigate = useNavigate();
  const [playListDetails, setPlaylistDetails] = useState(null);

  const {
    state: { token },
  } = useAuth();

  const { state, dispatch } = usePlayList();
  useEffect(() => {
    (async () => {
      const response = await getPlayListByIdService(playListId, token);
      setPlaylistDetails(response.data.playlist);
    })();
  }, [playListId]);

  async function handleDeletePlayList() {
    try {
      const response = await deletePlaylistService(playListId, token);
      if (response !== undefined && response.status === 200) {
        setPlaylistDetails(response.data.playlist);
        dispatch({ type: SET_PLAYLIST, payload: response.data.playlist });
        navigate("/my-playlist");
        toast.success(`${playListDetails.title} playlist deleted!`);
      } else {
        throw new Error("Playlist is not deleted , something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDeleteVideoFromPlayList = async (id) => {
    try {
      const response = await deleteVideoFromPlaylistService(
        playListId,
        id,
        token
      );

      console.log(response);
      if (response !== undefined && response.status === 200) {
        setPlaylistDetails(response.data.playlist);
        toast.success(`Video Deleted from playlist ${playListDetails.title}`);
      } else {
        throw new Error("Something went wrong , video is not deleted");
      }

      const playListResponce = await getPlayListDetailsService(token);
      dispatch({
        type: SET_PLAYLIST,
        payload: playListResponce.data.playlists,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="playlistdetails-container">
      <div className="playlistdetails-details">
        <div className="playlist-details-action">
          <div className="playlist-title">{playListDetails?.title}</div>
          <button
            className="btn-float btn-danger-outline"
            title="delete the playlist"
            onClick={handleDeletePlayList}
          >
            <span class="material-icons md-24 playlist-delete">delete</span>
          </button>
        </div>

        {playListDetails && playListDetails.videos.length > 0 ? (
          <div>
            <img
              className="playlist-thumnail"
              src={playListDetails.videos[0]?.thumbnail}
              alt="playlist thumbnail"
            />
            <p>{playListDetails.videos.length} videos</p>
          </div>
        ) : (
          <div>You have not added anything in this playlist.</div>
        )}
      </div>

      <div className="playlist-content">
        {playListDetails &&
          playListDetails.videos?.map((video) => {
            return (
              <PlayListContent
                video={video}
                key={video._id}
                handleDeleteVideoFromPlayList={handleDeleteVideoFromPlayList}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PlayListDetails;
