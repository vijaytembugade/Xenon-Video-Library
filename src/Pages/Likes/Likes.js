import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useLikedVideo } from "../../Contexts";

const Likes = () => {
  const { likedVideos } = useLikedVideo();
  return (
    <div>
      {!likedVideos.length > 0 ? (
        <h2>You have not liked anything yet!</h2>
      ) : (
        <h2>Liked Videos</h2>
      )}
      <div className="videos-container">
        {likedVideos?.map((video) => {
          return <VideoCard video={video} key={video._id} />;
        })}
      </div>
    </div>
  );
};

export default Likes;
