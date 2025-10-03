import Cookies from "js-cookie";

const REFRESH_TOKEN_KEY = "refresh_token";

export const setTokens = (accessToken, refreshToken) => {
  console.warn("setTokens function is using Cookies. Consider updating to localStorage if authSlice is the primary token manager.");
  Cookies.set("access_token", accessToken, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 30,
    secure: process.env.NODE_ENV === "production",
  });
};

export const getAccessToken = () => {
  try {
    const storedAuth = window.localStorage.getItem('li');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      return parsedAuth.acs;
    }
  } catch (error) {
    console.error("Error parsing auth data from localStorage:", error);
  }
  return null;
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem('li');
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};
