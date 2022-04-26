import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import ILoginFormValues from "../interfaces/ILoginFormValues";
import axiosInstance from "../utils/axiosInstance";

const endpoint = `${process.env.BACKEND_ENDPOINT}/auth/local/signin`;

const loginAPI = (values: ILoginFormValues) => {
  return axiosInstance.post(endpoint, values, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
};

export default loginAPI;
