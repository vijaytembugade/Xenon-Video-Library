import React, { useState } from "react";
import "./VideoListing.css";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useFilter, useVideos } from "../../Contexts";
import Filters from "../../Components/Filters/Filters";

export const VideoListing = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { videos: allVideos } = useVideos();

  const { state } = useFilter();

  const filterByCategoryVideos = allVideos.filter((video) => {
    if (state.byCategory.length > 0) {
      return state.byCategory.includes(video.category);
    }
    return video;
  });

  const filterByAuthorVideos = filterByCategoryVideos.filter((video) => {
    if (state.byAuthor.length > 0) {
      return state.byAuthor.includes(video.author);
    }
    return video;
  });
  const filterByCreatorVideos = filterByAuthorVideos.filter((video) => {
    if (state.byCreator.length > 0) {
      return state.byCreator.includes(video.creator);
    }
    return video;
  });

  const videos = filterByCreatorVideos;

  return (
    <>
      <div className="filter-container">
        {!showFilter && (
          <div
            className="btn btn-small btn-primary"
            onClick={() => setShowFilter(true)}
          >
            <span class="material-icons">apps</span>FILTERS
          </div>
        )}
        <div>{showFilter && <Filters setShowFilter={setShowFilter} />}</div>
      </div>
      <h2 className="all-videos-title">All Videos ({videos?.length})</h2>
      <h4 className="all-videos-title gray-text">
        {videos?.length === 0 && "No videos available for this filter!"}
      </h4>
      <div className="videos-container-main">
        {videos?.map((video) => {
          return <VideoCard video={video} key={video._id} />;
        })}
      </div>
    </>
  );
};
