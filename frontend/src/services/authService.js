// src/services/authService.js
import API from "./api";
import { startLogin } from "../utils/auth";

// Register a new user
export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data; // { token, user }
};

// Login user
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  const { token, user } = response.data;
  startLogin(token, user);
  return response.data; // { token, user }
};

// Get current logged-in user (protected route)
export const getMe = async () => {
  const response = await API.get("/auth/me");
  return response.data; // user object
};
