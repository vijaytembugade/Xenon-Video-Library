import axios from "axios";

export const getWatchLaterVideos = (token) => {
  try {
    const response = axios.get("/api/user/watchlater", {
      headers: { authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
