import axios from "axios";

//we will create a base url that will used to avoid repeating code
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  //timeout: 5000, // optional if we want to set a min limit to respond for the server
});

// This will attach the JWT token to our every request in headers.Authorization
// This is how the server will validate who is sending the request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default API;
