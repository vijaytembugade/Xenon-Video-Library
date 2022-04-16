import axios from "axios";

export const getSingleVideoService = (id) => {
  try {
    const response = axios.get(`/api/video/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
