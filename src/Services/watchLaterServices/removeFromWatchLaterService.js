import axios from "axios";

export const removeFromWatchLaterService = async (id, token) => {
  try {
    const response = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
