import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import deleteProject from "../../api/delteProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISuccessful from "../../interfaces/ISuccessful";

export default function useDeleteProject(id: number) {
  return useMutation<
    AxiosResponse<ISuccessful, any>,
    Error | AxiosError<IServerErrorResponse>,
    null
  >(async () => deleteProject(id));
}
