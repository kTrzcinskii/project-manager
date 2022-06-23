import ICreateGoalValues from "../interfaces/ICreateGoalValues";
import IProject from "../interfaces/IProject";
import axiosInstance from "../utils/axiosInstance";

const createGoal = (values: ICreateGoalValues, projectId: number) => {
  const endpoint = `/goal/${projectId}`;

  return axiosInstance.post<IProject>(endpoint, values);
};

export default createGoal;
