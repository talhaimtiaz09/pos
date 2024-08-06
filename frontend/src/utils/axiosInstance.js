// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust this URL to your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
