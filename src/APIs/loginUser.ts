import { axiosInstance } from ".";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ access_token: string; refresh_token: string }> => {
  return await axiosInstance
    .post<{ access_token: string; refresh_token: string }>("/auth/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default loginUser;
