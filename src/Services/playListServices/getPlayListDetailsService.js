import axios from "axios";

export const getPlayListDetailsService = async (token) => {
  try {
    const response = await axios.get("/api/user/playlists", {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
