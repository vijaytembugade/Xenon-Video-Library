import axios from "axios";

export const signupService = async (
  email,
  password,
  firstName,
  lastName,
  token
) => {
  try {
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
