import axios from "axios";

export const deleteVideoFromHistoryService = async (id, token) => {
  try {
    const response = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
