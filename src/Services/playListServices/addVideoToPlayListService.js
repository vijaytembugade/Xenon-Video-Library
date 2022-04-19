import axios from "axios";

export const addVideoToPlayListService = async (id, video, token) => {
  try {
    const response = await axios.post(
      `/api/user/playlists/${id}`,
      {
        video,
      },
      {
        headers: { authorization: token },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
