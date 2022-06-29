import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import refreshTokens from "../api/refreshTokens";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
});

createAuthRefreshInterceptor(axiosInstance, refreshTokens);

export default axiosInstance;
