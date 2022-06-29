import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import IRegisterFormValues from "../interfaces/IRegisterFormValues";
import ISuccessful from "../interfaces/ISuccessful";
import ISuccessfulWithTokens from "../interfaces/ISuccessfulWithTokens";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/auth/local/signup";

const registerAPI = (values: IRegisterFormValues) => {
  return axiosInstance.post<ISuccessfulWithTokens>(endpoint, values, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
};

export default registerAPI;
