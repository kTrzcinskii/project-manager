import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import editGoal from "../../api/editGoal";
import IEditGoalValues from "../../interfaces/IEditGoalValues";
import IGoal from "../../interfaces/IGoal";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useEditGoal(id: number) {
  return useMutation<
    AxiosResponse<IGoal, any>,
    Error | AxiosError<IServerErrorResponse>,
    IEditGoalValues
  >(async (values: IEditGoalValues) => editGoal(id, values));
}
