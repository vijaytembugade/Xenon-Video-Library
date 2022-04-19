import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaylistModal from "../../Components/PlayListModal/PlaylistModal";
import PlayListShowCard from "../../Components/PlayListShowCard/PlayListShowCard";
import { usePlayList } from "../../Contexts";
import "./PlayList.css";

const PlayList = () => {
  const [showPlayListModal, setShowPlayListModal] = useState(false);
  const {
    state: { playList },
    dispatch,
  } = usePlayList();
  return (
    <div>
      <div className="create-new-playlist">
        <h2>My Playlists</h2>
        <button
          className="btn btn-primary-outline"
          onClick={() => setShowPlayListModal(true)}
        >
          <span class="material-icons">add_circle_outline</span>
          <span>Create New PlayList</span>
        </button>
        {showPlayListModal && (
          <PlaylistModal setShowPlayListModal={setShowPlayListModal} />
        )}
      </div>

      <div className="flex-container all-playlist">
        {playList?.map((list) => {
          return (
            <Link to={`/my-playlist/${list._id}`} key={list._id}>
              <PlayListShowCard title={list.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PlayList;
