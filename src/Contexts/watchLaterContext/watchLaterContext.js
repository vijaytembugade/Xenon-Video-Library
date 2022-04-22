import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../Contexts";
import { getWatchLaterVideos } from "../../Services";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const {
    state: { isLoggedIn, token },
  } = useAuth();

  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const response = await getWatchLaterVideos(token);
          setWatchLaterVideos(response.data.watchlater);
        } catch (error) {
          toast.error(error.message);
        }
      })();
    } else {
      setWatchLaterVideos([]);
    }
  }, [isLoggedIn, token]);
  return (
    <WatchLaterContext.Provider
      value={{ watchLaterVideos, setWatchLaterVideos }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => {
  const context = useContext(WatchLaterContext);
  if (context === null) {
    throw new Error("Error in useWatchLater");
  }
  return context;
};

export { WatchLaterProvider, useWatchLater };
