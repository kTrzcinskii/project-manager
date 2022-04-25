import axios from "axios";
import IRegisterFormValues from "../interfaces/IRegisterFormValues";
import ISuccessful from "../interfaces/ISuccessful";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/auth/local/signup";

const registerAPI = (values: IRegisterFormValues) => {
  return axiosInstance.post<ISuccessful>(endpoint, values);
};

export default registerAPI;
