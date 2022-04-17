import axios from "axios";
import { useReducer, useEffect, useContext, createContext } from "react";
import { PLAYLIST_LOADING, SET_PLAYLIST } from "../../Constants";
import { useAuth } from "../../Contexts";
import { getPlayListDetailsService } from "../../Services";

const PlayListContext = createContext();

const PlayListProvider = ({ children }) => {
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const initialState = {
    isLoading: false,
    playList: [],
  };

  const playListReducer = (state, action) => {
    switch (action.type) {
      case PLAYLIST_LOADING: {
        return { ...state, isLoading: true };
      }
      case SET_PLAYLIST: {
        return { ...state, isLoading: false, playList: action.payload };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(playListReducer, initialState);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const response = await getPlayListDetailsService(token);
        dispatch({ type: SET_PLAYLIST, payload: response.data.playlists });
      })();
    } else {
      dispatch({ type: SET_PLAYLIST, payload: [] });
    }
  }, [isLoggedIn, token]);

  return (
    <PlayListContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayListContext.Provider>
  );
};

const usePlayList = () => {
  const context = useContext(PlayListContext);
  if (!context) {
    throw new Error("usePlayList invalidation");
  }
  return context;
};

export { usePlayList, PlayListProvider };
