import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import registerAPI from "../../api/register";
import IRegisterFormValues from "../../interfaces/IRegisterFormValues";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";
import ISuccessfulWithTokens from "../../interfaces/ISuccessfulWithTokens";

export default function useRegister() {
  return useMutation<
    AxiosResponse<ISuccessfulWithTokens, any>,
    Error | AxiosError<IServerErrorResponse>,
    IRegisterFormValues
  >(async (values: IRegisterFormValues) => registerAPI(values));
}
