import { create } from 'zustand';
import { isAuthenticated, setTokens, removeTokens, getAccessToken, getRefreshToken } from '@/lib/auth';

export const useAuthStore = create((set) => ({
  isAuthenticated: isAuthenticated(),
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),

  login: (accessToken, refreshToken) => {
    setTokens(accessToken, refreshToken);
    set({ isAuthenticated: true, accessToken, refreshToken });
  },

  logout: () => {
    removeTokens();
    set({ isAuthenticated: false, accessToken: null, refreshToken: null });
  },
}));