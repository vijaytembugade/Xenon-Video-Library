import axios from "axios";

export const createPlayListService = async (title, token) => {
  try {
    const response = await axios.post(
      "/api/user/playlists",
      {
        playlist: { title },
      },
      { headers: { authorization: token } }
    );

    return response;
  } catch (error) {
    console.log(erorr);
  }
};
