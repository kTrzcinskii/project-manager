import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import logoutAPI from "../../api/logout";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";

export default function useLogout() {
  return useMutation<
    AxiosResponse<ISuccessful, any>,
    Error | AxiosError<IServerErrorResponse>,
    null
  >(() => logoutAPI());
}
