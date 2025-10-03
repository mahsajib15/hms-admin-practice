import { create } from "zustand";
import {
  isAuthenticated as checkAuth,
  setTokens,
  removeTokens,
  getAccessToken,
  getRefreshToken,
} from "@/lib/auth";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  // Initial state
  isAuthenticated: checkAuth(),
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),

  // Login method
  login: (accessToken, refreshToken) => {
    setTokens(accessToken, refreshToken);

    // Store tokens in cookies for persistence (7 days)
    Cookies.set("accessToken", accessToken, { expires: 7 });
    Cookies.set("refreshToken", refreshToken, { expires: 7 });

    set({ isAuthenticated: true, accessToken, refreshToken });
  },

  // Logout method
  logout: () => {
    removeTokens();

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    set({ isAuthenticated: false, accessToken: null, refreshToken: null });
  },
}));
