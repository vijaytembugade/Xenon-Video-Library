import React, { useState } from "react";
import "./VideoListing.css";
import VideoCard from "../../Componets/VideoCard/VideoCard";
import { useVideos } from "../../Contexts";
import Filters from "../../Componets/Filters/Filters";

export const VideoListing = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { videos } = useVideos();

  return (
    <>
      <div className="filter-container">
        <div
          className="btn btn-small btn-primary-outline"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span class="material-icons">apps</span>FILTERS
        </div>
        <div>{showFilter && <Filters />}</div>
      </div>
      <h2 className="all-videos-title">All Videos ({videos.length})</h2>
      <div className="videos-container">
        {videos.map((video) => {
          return <VideoCard video={video} key={video._id} />;
        })}
      </div>
    </>
  );
};
