import IChangeUsernameValues from "../interfaces/IChangeUsernameValues";
import IPublicUserResponse from "../interfaces/IPublisUserResponse";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/change-username";

const changeUsernameAPI = (values: IChangeUsernameValues) => {
  return axiosInstance.patch<IPublicUserResponse>(endpoint, values);
};

export default changeUsernameAPI;
