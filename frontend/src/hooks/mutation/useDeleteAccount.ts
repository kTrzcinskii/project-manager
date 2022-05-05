import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import deleteAccountAPI from "../../api/deleteAccount";
import IDeleteAccountValues from "../../interfaces/IDeleteAccountValues";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";

export default function useDeleteAccount() {
  return useMutation<
    AxiosResponse<ISuccessful, any>,
    Error | AxiosError<IServerErrorResponse>,
    IDeleteAccountValues
  >(async (values: IDeleteAccountValues) => deleteAccountAPI(values));
}
