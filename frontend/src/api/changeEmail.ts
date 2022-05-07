import IChangeEmailValues from "../interfaces/IChangeEmailValues";
import IPublicUserResponse from "../interfaces/IPublisUserResponse";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/change-email";

const changeEmailAPI = (values: IChangeEmailValues) => {
  return axiosInstance.patch<IPublicUserResponse>(endpoint, values);
};

export default changeEmailAPI;
