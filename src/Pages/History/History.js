import React from "react";
import toast from "react-hot-toast";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useAuth, useHistoryVideo } from "../../Contexts";
import { deleteHistoryService } from "../../Services";

const History = () => {
  const {
    state: { token },
  } = useAuth();
  const { historyVideos, setHistoryVideos } = useHistoryVideo();

  async function handleClearHistroy() {
    try {
      const response = await deleteHistoryService(token);
      if (response !== undefined && response.status === 200) {
        setHistoryVideos(response.data.history);
        toast.success("History cleared!");
      } else {
        throw Error("Unable to clear the History!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <div>
        <div className="flex-container">
          {!historyVideos.length > 0 ? (
            <>
              <h2>You have not watched anything yet!</h2>
            </>
          ) : (
            <>
              <h2>Your History</h2>
              <button className="btn btn-primary" onClick={handleClearHistroy}>
                Clear History
              </button>
            </>
          )}
        </div>

        <div className="videos-container">
          {historyVideos?.map((video) => {
            return <VideoCard video={video} key={video._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
