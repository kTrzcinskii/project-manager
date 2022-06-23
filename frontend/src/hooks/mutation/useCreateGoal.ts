import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import createGoal from "../../api/createGoal";
import ICreateGoalValues from "../../interfaces/ICreateGoalValues";
import IProject from "../../interfaces/IProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useCreateGoal(projectId: number) {
  return useMutation<
    AxiosResponse<IProject, any>,
    Error | AxiosError<IServerErrorResponse>,
    ICreateGoalValues
  >(async (values) => createGoal(values, projectId));
}
