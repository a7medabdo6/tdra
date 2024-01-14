// axiosInstance.js
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "",
  // You can add other default configuration options here
});
instance.interceptors.request.use((config) => {
  // You can customize the header based on your authentication mechanism
  const authToken = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});
