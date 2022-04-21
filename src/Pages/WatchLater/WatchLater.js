import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useWatchLater } from "../../Contexts";

const WatchLater = () => {
  const { watchLaterVideos } = useWatchLater();
  return (
    <div>
      <div>
        {!watchLaterVideos.length > 0 ? (
          <h2>You have not added anything in watch later!</h2>
        ) : (
          <h2>Watch Later videos</h2>
        )}
        <div className="videos-container">
          {watchLaterVideos?.map((video) => {
            return <VideoCard video={video} key={video._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
