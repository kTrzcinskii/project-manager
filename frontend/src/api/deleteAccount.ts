import IDeleteAccountValues from "../interfaces/IDeleteAccountValues";
import ISuccessful from "../interfaces/ISuccessful";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/delete-account";

const deleteAccountAPI = (values: IDeleteAccountValues) => {
  return axiosInstance.delete<ISuccessful>(endpoint, { data: values });
};

export default deleteAccountAPI;
