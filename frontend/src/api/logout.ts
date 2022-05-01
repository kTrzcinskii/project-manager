import ISuccessful from "../interfaces/ISuccessful";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/auth/logout";

const logoutAPI = () => {
  return axiosInstance.post<ISuccessful>(endpoint);
};

export default logoutAPI;
