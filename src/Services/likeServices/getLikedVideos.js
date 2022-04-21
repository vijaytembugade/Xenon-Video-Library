import axios from "axios";

export const getLikedVideos = async (token) => {
  try {
    const response = axios.get("/api/user/likes", {
      headers: { authorization: token },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
