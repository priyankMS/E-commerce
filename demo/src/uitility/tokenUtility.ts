// src/utils/tokenUtils.js

import { jwtDecode } from "jwt-decode";


export const isTokenExpired = (token:string|null) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return true;
    }

    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
};
