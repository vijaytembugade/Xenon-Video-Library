import React, { useRef, useState } from "react";
import "./PlayListModal.css";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { useAuth, usePlayList } from "../../Contexts";
import {
  addVideoToPlayListService,
  createPlayListService,
  getPlayListDetailsService,
} from "../../Services";
import toast from "react-hot-toast";
import { SET_PLAYLIST } from "../../Constants";

const PlaylistModal = ({ setShowPlayListModal, video }) => {
  const [inputPlaylist, setInputPlaylist] = useState("");
  const [selectedPlaylistId, setselectedPlaylistId] = useState("");

  const {
    state: { playList },
    dispatch,
  } = usePlayList();

  const {
    state: { token },
  } = useAuth();

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => setShowPlayListModal(false));

  async function handleCreatePlayList() {
    try {
      if (inputPlaylist.trim().length === 0) {
        throw new Error("Playlist name should not be blank!");
      }
      const response = await createPlayListService(inputPlaylist, token);

      if (response !== undefined && response.status === 201) {
        dispatch({ type: SET_PLAYLIST, payload: response.data.playlists });
        toast.success(`${inputPlaylist} playlist created!`);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInputPlaylist("");
  }

  function handleSelectPlayList(id) {
    setselectedPlaylistId(id);
  }

  async function handleAddToPlayList() {
    try {
      if (
        selectedPlaylistId === "" ||
        selectedPlaylistId === undefined ||
        !selectedPlaylistId
      ) {
        throw new Error("Inavlid Selection of Playlist");
      }
      const response = await addVideoToPlayListService(
        selectedPlaylistId,
        video,
        token
      );
      if (response === undefined) {
        throw new Error("Something went Wrong!");
      }
      setShowPlayListModal(false);

      toast.success(`Video added In ${response.data.playlist.title} Playlist`);

      const playListResponce = await getPlayListDetailsService(token);
      dispatch({
        type: SET_PLAYLIST,
        payload: playListResponce.data.playlists,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  const videoIncludedPlayLists = playList.reduce((acc, curr) => {
    const found = curr.videos.find((item) => item._id === video._id);
    if (found !== undefined) {
      return [...acc, curr.title];
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="playlist-modal">
      <dialog
        open
        className="playlist-dialog"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-playlist-container">
          <input
            className="create-playlist"
            type="text"
            placeholder="Create new playlist.."
            value={inputPlaylist}
            onChange={(e) => setInputPlaylist(e.target.value)}
          />
          <button
            className="btn btn-small btn-primary-outline create-playlist-button"
            onClick={handleCreatePlayList}
          >
            Create
          </button>
        </div>
        <div className="playlist-listing">
          {playList.length > 0
            ? playList?.map((item, index) => {
                return (
                  <div
                    className={
                      selectedPlaylistId === item._id ||
                      videoIncludedPlayLists.includes(item.title)
                        ? "playlist-name selected"
                        : "playlist-name"
                    }
                    key={index}
                    onClick={() => handleSelectPlayList(item._id)}
                  >
                    <span>{index + 1}. </span>
                    <span>{item.title}</span>
                  </div>
                );
              })
            : "No playlist avilable"}
        </div>

        <button
          disabled={playList.length > 0 ? false : true}
          className="add-to-playlist btn btn-small btn-secondary"
          onClick={handleAddToPlayList}
        >
          Add to Playlist
        </button>
      </dialog>
    </div>
  );
};

export default PlaylistModal;
