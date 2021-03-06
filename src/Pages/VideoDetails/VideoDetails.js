import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayerFrame from "../../Components/ReactPlayer/ReactPlayerFrame";
import VideoDescription from "../../Components/VideoDescription/VideoDescription";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { getSingleVideoService, getSuggestionsVideo } from "../../Services";
import "./VideoDetails.css";

function VideoDetails() {
  const [video, setVideo] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getSingleVideoService(id);
      setVideo(data.video);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const suggested = await getSuggestionsVideo(
        video.author,
        video._id,
        video.creator
      );
      setSuggestions(suggested);
    })();
  }, [video, setSuggestions]);

  return (
    <>
      <span
        title="videos"
        class="material-icons back-btn btn-float btn-secondary"
        onClick={() => navigate(-1)}
      >
        arrow_back
      </span>
      <div className="video-details-page">
        <div className="video-details-container">
          <ReactPlayerFrame video={video} />
          <VideoDescription video={video} />
        </div>

        {/* suggested videos */}
        <div className="video-suggestion-container">
          {suggestions.length > 0 && <h3>Videos You may also like...</h3>}
          {suggestions.length > 0 &&
            suggestions?.map((suggestion) => {
              return <VideoCard video={suggestion} />;
            })}
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
