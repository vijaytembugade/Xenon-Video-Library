import axios from "axios";

export const getAllHistoryService = async (token) => {
  try {
    const response = axios.get("/api/user/history", {
      headers: { authorization: token },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
