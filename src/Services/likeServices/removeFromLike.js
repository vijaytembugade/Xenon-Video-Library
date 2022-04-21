import axios from "axios";

export const removeFromLike = async (id, token) => {
  try {
    const response = await axios.delete(`/api/user/likes/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
