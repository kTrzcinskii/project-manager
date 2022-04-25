import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});

export default axiosInstance;
