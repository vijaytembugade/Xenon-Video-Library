import axios from "axios";

export const addToWatchLaterService = async (video, token) => {
  try {
    const response = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
