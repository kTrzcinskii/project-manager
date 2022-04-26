import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import IRegisterFormValues from "../interfaces/IRegisterFormValues";
import ISuccessful from "../interfaces/ISuccessful";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/auth/local/signup";

const registerAPI = (values: IRegisterFormValues) => {
  return axiosInstance.post<ISuccessful>(endpoint, values, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
};

export default registerAPI;
