import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/auth/register", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/auth/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/get-current-user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
