import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getLikedVideos } from "../../Services";
import { useAuth } from "../authContext/authContext";

const LikeContext = createContext();
function LikedVideoProvider({ children }) {
  const {
    state: { isLoggedIn, token },
  } = useAuth();

  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const response = await getLikedVideos(token);
          setLikedVideos(response.data.likes);
        } catch (error) {
          toast.error("Failed to fetch liked videos");
        }
      })();
    } else {
      setLikedVideos([]);
    }
  }, [isLoggedIn, token]);

  return (
    <LikeContext.Provider value={{ likedVideos, setLikedVideos }}>
      {children}
    </LikeContext.Provider>
  );
}

const useLikedVideo = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("Error in useLikedVideo");
  }

  return context;
};

export { LikedVideoProvider, useLikedVideo };
