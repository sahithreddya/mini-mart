import addUserCart from "./addUserCart";
import getUserProfile from "./getUserProfile";
import loginUser from "./loginUser";
import getProducts from "./getProducts";
import getProductCategories from "./getProductCategories";
import getProductDetailsById from "./getProductDetailsById";
import axios from "axios";

const REQUEST_DELAY_MS = 1500;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return new Promise((res) =>
      setTimeout(() => {
        res(request);
      }, REQUEST_DELAY_MS)
    );
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        console.log("Refreshing token...");

        const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken,
        });
        console.log("Token refresh response:", response.data);
        const { access_token: accessToken, refresh_token: newRefreshToken } =
          response.data;
        // Store the new access and refresh tokens.
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export {
  axiosInstance,
  loginUser,
  addUserCart,
  getUserProfile,
  getProducts,
  getProductCategories,
  getProductDetailsById,
};
