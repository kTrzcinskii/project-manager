import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import ILoginFormValues from "../interfaces/ILoginFormValues";
import ISuccessful from "../interfaces/ISuccessful";
import ISuccessfulWithTokens from "../interfaces/ISuccessfulWithTokens";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/auth/local/signin";

const loginAPI = (values: ILoginFormValues) => {
  return axiosInstance.post<ISuccessfulWithTokens>(endpoint, values, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
};

export default loginAPI;
