import React from "react";
import "./VideoListing.css";
import VideoCard from "../../Componets/VideoCard/VideoCard";
import { useVideos } from "../../Contexts";

export const VideoListing = () => {
  const { videos } = useVideos();

  return (
    <>
      <h2 className="all-videos-title">All Videos ({videos.length})</h2>
      <div className="videos-container">
        {videos.map((video) => {
          return <VideoCard video={video} key={video._id} />;
        })}
      </div>
    </>
  );
};
