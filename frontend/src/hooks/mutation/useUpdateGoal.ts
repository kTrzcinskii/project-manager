import { useMutation } from "react-query";
import updateGoal from "../../api/updateGoal";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import IUpdateGoalResponse from "../../interfaces/IUpdateGoalResponse";
import { AxiosResponse, AxiosError } from "axios";

export default function useUpdateGoal(id: number) {
  return useMutation<
    AxiosResponse<IUpdateGoalResponse, any>,
    Error | AxiosError<IServerErrorResponse>,
    null
  >(async () => updateGoal(id));
}
