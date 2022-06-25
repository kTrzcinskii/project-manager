import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import deleteGoal from "../../api/deleteGoal";
import IProject from "../../interfaces/IProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useDeleteGoal(id: number) {
  return useMutation<
    AxiosResponse<IProject, any>,
    Error | AxiosError<IServerErrorResponse>,
    null
  >(async () => deleteGoal(id));
}
