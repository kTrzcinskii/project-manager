import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import refreshTokens from "../api/refreshTokens";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "/api",
});

createAuthRefreshInterceptor(axiosInstance, refreshTokens);

export default axiosInstance;
