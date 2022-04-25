import axios from "axios";

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/categories");
    return data.categories;
  } catch (error) {
    console.log(erorr);
  }
};
