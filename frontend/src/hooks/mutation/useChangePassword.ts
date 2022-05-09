import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import changePasswordAPI from "../../api/changePassword";
import IChangePasswordValues from "../../interfaces/IChangePasswordValues";
import IPublicUserResponse from "../../interfaces/IPublisUserResponse";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useChangePassword() {
  return useMutation<
    AxiosResponse<IPublicUserResponse, any>,
    Error | AxiosError<IServerErrorResponse>,
    IChangePasswordValues
  >(async (values: IChangePasswordValues) => changePasswordAPI(values));
}
