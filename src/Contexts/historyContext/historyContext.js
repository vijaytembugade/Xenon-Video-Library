import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllHistoryService } from "../../Services";

import { useAuth } from "../authContext/authContext";

const HistoryContext = createContext();
function HistoryProvider({ children }) {
  const {
    state: { isLoggedIn, token },
  } = useAuth();

  const [historyVideos, setHistoryVideos] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const response = await getAllHistoryService(token);
          setHistoryVideos(response.data.history);
        } catch (error) {
          toast.error("Failed to fetch your history");
        }
      })();
    } else {
      setHistoryVideos([]);
    }
  }, [isLoggedIn, token]);

  return (
    <HistoryContext.Provider value={{ historyVideos, setHistoryVideos }}>
      {children}
    </HistoryContext.Provider>
  );
}

const useHistoryVideo = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("Error in useHistoryVideo");
  }

  return context;
};

export { HistoryProvider, useHistoryVideo };
