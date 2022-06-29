import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import loginAPI from "../../api/login";
import ILoginFormValues from "../../interfaces/ILoginFormValues";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";
import ISuccessfulWithTokens from "../../interfaces/ISuccessfulWithTokens";

export default function useLogin() {
  return useMutation<
    AxiosResponse<ISuccessfulWithTokens, any>,
    Error | AxiosError<IServerErrorResponse>,
    ILoginFormValues
  >(async (values: ILoginFormValues) => loginAPI(values));
}
