import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/pages/store/authStore";

const API_URL = `${
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}/api`;

// const API_URL = `${
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
// }/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending cookies
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token"); // Get token from cookie
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is 401 Unauthorized and it's not a retry attempt
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried
      const refreshToken = Cookies.get("refresh_token"); // Get refresh token from cookie

      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const refreshResponse = await axios.post(
            `${API_URL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          if (refreshResponse.status === 200) {
            const {
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            } = refreshResponse.data;

            // Update tokens in cookies
            Cookies.set("access_token", newAccessToken, { expires: 7 });
            Cookies.set("refresh_token", newRefreshToken, { expires: 30 });

            // Update Zustand store (optional, but good for reactivity)
            useAuthStore.getState().login(newAccessToken, newRefreshToken);

            // Update the Authorization header for the original request
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // Retry the original request with the new token
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // If refresh fails, log out the user
          useAuthStore.getState().logout();
          // Redirect to login page
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, log out
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
