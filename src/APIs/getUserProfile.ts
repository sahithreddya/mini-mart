import { axiosInstance } from ".";

const getUserProfile = async () => {
  return await axiosInstance
    .get("http://localhost:3000/api/v1/auth/profile")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default getUserProfile;
