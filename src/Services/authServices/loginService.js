import axios from "axios";

export const loginService = async (email, password, token) => {
  try {
    const response = await axios.post(
      "/api/auth/login",
      {
        email,
        password,
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
