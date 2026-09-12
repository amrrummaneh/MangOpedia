import { getUserInfoFromToken, isTokenExpired } from "../../utility/jwtUtility";
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEYS = {
  TOKEN: "token-mango",
  USER: "user-mango",
};

const getInitialAuthState = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  //clear invalid token

  if (
    !token ||
    token === "undefined" ||
    token === "null" ||
    isTokenExpired(token)
  ) {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};
