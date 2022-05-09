import IChangePasswordValues from "../interfaces/IChangePasswordValues";
import IPublicUserResponse from "../interfaces/IPublisUserResponse";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/change-password";

const changePasswordAPI = (values: IChangePasswordValues) => {
  return axiosInstance.patch<IPublicUserResponse>(endpoint, values);
};

export default changePasswordAPI;
