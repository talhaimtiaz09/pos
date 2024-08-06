// src/utils/fetchData.js
import axiosInstance from "./axiosInstance";

const fetchData = async (url, method = "GET", data = null, headers = {}) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      headers,
    });
    console.log("Response (fetch data function) : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
