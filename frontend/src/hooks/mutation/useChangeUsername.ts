import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import changeUsernameAPI from "../../api/changeUsername";
import IChangeUsernameValues from "../../interfaces/IChangeUsernameValues";
import IPublicUserResponse from "../../interfaces/IPublisUserResponse";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useChangeUsername() {
  return useMutation<
    AxiosResponse<IPublicUserResponse, any>,
    Error | AxiosError<IServerErrorResponse>,
    IChangeUsernameValues
  >(async (values: IChangeUsernameValues) => changeUsernameAPI(values));
}
