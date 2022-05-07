import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import changeEmailAPI from "../../api/changeEmail";
import IChangeEmailValues from "../../interfaces/IChangeEmailValues";
import IPublicUserResponse from "../../interfaces/IPublisUserResponse";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useChangeEmail() {
  return useMutation<
    AxiosResponse<IPublicUserResponse, any>,
    Error | AxiosError<IServerErrorResponse>,
    IChangeEmailValues
  >(async (values: IChangeEmailValues) => changeEmailAPI(values));
}
