// axiosInstance.js
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "",
  // You can add other default configuration options here
});
