import axios from 'axios';
import { setCredentials, logout } from '@/app/features/auth/authSlice';
import { store } from '@/app/index'; // Assuming your Redux store is exported from here

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshResponse = await axiosInstance.get('/auth/refresh');

      if (refreshResponse.status === 200) {
        const newToken = refreshResponse.data.access_token;
        const user = store.getState().auth.user;
        store.dispatch(setCredentials({ token: newToken, user }));
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
