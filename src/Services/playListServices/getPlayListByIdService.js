import axios from "axios";

export const getPlayListByIdService = async (id, token) => {
  try {
    const response = await axios.get(`/api/user/playlists/${id}`, {
      headers: { authorization: token },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
