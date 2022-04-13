import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response.data.videos);
      } catch (err) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videos }}>{children}</VideoContext.Provider>
  );
};

const useVideos = () => useContext(VideoContext);

export { VideoProvider, useVideos };
