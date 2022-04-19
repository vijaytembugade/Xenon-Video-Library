import axios from "axios";

export const deletePlaylistService = async (id, token) => {
  try {
    const response = axios.delete(`/api/user/playlists/${id}`, {
      headers: { authorization: token },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
