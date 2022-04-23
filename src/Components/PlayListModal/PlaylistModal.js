import React, { useRef, useState, useEffect } from "react";
import "./PlayListModal.css";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { useAuth, usePlayList } from "../../Contexts";
import {
  addVideoToPlayListService,
  createPlayListService,
  deleteVideoFromPlaylistService,
  getPlayListDetailsService,
} from "../../Services";
import toast from "react-hot-toast";
import { SET_PLAYLIST } from "../../Constants";
import { matchPath, useLocation } from "react-router-dom";

const PlaylistModal = ({ setShowPlayListModal, video = "" }) => {
  const [inputPlaylist, setInputPlaylist] = useState("");
  const [selectedPlaylist, setselectedPlaylist] = useState({
    isSelected: false,
    id: null,
  });

  const { pathname } = useLocation();

  const {
    state: { playList },
    dispatch,
  } = usePlayList();

  const {
    state: { token },
  } = useAuth();

  const modalRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useOnClickOutside(modalRef, () => setShowPlayListModal(false));

  const videoIncludedPlayLists = playList.reduce((acc, curr) => {
    const found = curr.videos.find((item) => item._id === video._id);
    if (found !== undefined) {
      return [...acc, curr._id];
    } else {
      return acc;
    }
  }, []);

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

    if (matchPath("/my-playlist", pathname)) {
      setShowPlayListModal(false);
    }
  }

  function handleSelectPlayList(id) {
    if (videoIncludedPlayLists.includes(id)) {
      handleRemoveFromPlayList(id);
      setselectedPlaylist({ isSelected: false, id: null });
    } else {
      setselectedPlaylist({ isSelected: true, id: id });
    }
  }

  async function handleAddToPlayList() {
    try {
      if (
        selectedPlaylist.id === "" ||
        selectedPlaylist.id === null ||
        !selectedPlaylist.isSelected
      ) {
        throw new Error("Inavlid Selection of Playlist");
      }
      const response = await addVideoToPlayListService(
        selectedPlaylist.id,
        video,
        token
      );
      if (response === undefined) {
        throw new Error("Something went Wrong!");
      }
      setShowPlayListModal(false);

      toast.success(`Video added In ${response.data.playlist.title} Playlist`);

      const playListResponse = await getPlayListDetailsService(token);
      dispatch({
        type: SET_PLAYLIST,
        payload: playListResponse.data.playlists,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleRemoveFromPlayList(id) {
    try {
      const response = await deleteVideoFromPlaylistService(
        id,
        video._id,
        token
      );
      if (response !== undefined && response.status === 200) {
        setselectedPlaylist({ isSelected: false, id: null });
        toast.success("Video Removed From playlist");
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
  }

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
            ref={inputRef}
          />
          <button
            className="btn btn-small btn-primary-outline create-playlist-button"
            onClick={handleCreatePlayList}
          >
            Create
          </button>
        </div>

        {!matchPath("/my-playlist", pathname) && (
          <div className="playlist-listing">
            {playList.length > 0
              ? playList?.map((item, index) => {
                  return (
                    <div
                      className={
                        selectedPlaylist.id === item._id ||
                        videoIncludedPlayLists.includes(item._id)
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
        )}

        {!matchPath("/my-playlist", pathname) && (
          <button
            disabled={playList.length > 0 ? false : true}
            className="add-to-playlist btn btn-small btn-secondary"
            onClick={handleAddToPlayList}
          >
            Add to Playlist
          </button>
        )}
      </dialog>
    </div>
  );
};

export default PlaylistModal;
