import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player/youtube";
import { useAuth, useHistoryVideo } from "../../Contexts";
import {
  addToHistoryService,
  deleteVideoFromHistoryService,
} from "../../Services";
import "./ReactPlayerFrame.css";

const ReactPlayerFrame = ({ video }) => {
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const { historyVideos, setHistoryVideos } = useHistoryVideo();

  async function maintainHistory() {
    try {
      const response = await deleteVideoFromHistoryService(video._id, token);
      setHistoryVideos(response.data.history);
      return true;
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleAddToHistory = async () => {
    try {
      const response = await addToHistoryService(video, token);
      if (response !== undefined && response.status === 201) {
        setHistoryVideos(response.data.history);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="player">
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        controls={true}
        url={`https://www.youtube.com/watch?v=${video._id}`}
        onStart={() => {
          isLoggedIn && maintainHistory() && handleAddToHistory();
        }}
      />
    </div>
  );
};

export default ReactPlayerFrame;
