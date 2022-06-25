import IUpdateGoalResponse from "../interfaces/IUpdateGoalResponse";
import axiosInstance from "../utils/axiosInstance";

const updateGoal = (id: number) => {
  const endpoint = `/goal/${id}`;

  return axiosInstance.patch<IUpdateGoalResponse>(endpoint);
};

export default updateGoal;
