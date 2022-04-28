import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import IMe from "../interfaces/IMe";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/me";

const meServerSideAPI = (cookies: string) => {
  return axiosInstance.get<IMe>(endpoint, {
    withCredentials: true,
    headers: { Cookie: cookies },
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
};

export default meServerSideAPI;
