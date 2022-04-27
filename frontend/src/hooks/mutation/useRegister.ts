import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import registerAPI from "../../api/register";
import IRegisterFormValues from "../../interfaces/IRegisterFormValues";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";

export default function useRegister() {
  return useMutation<
    AxiosResponse<ISuccessful, any>,
    Error | AxiosError<IServerErrorResponse>,
    IRegisterFormValues
  >(async (values: IRegisterFormValues) => registerAPI(values));
}
