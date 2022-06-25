import IEditGoalValues from "../interfaces/IEditGoalValues";
import IGoal from "../interfaces/IGoal";
import axiosInstance from "../utils/axiosInstance";

const editGoal = (id: number, values: IEditGoalValues) => {
  const endpoint = `/goal/${id}/change-content`;

  return axiosInstance.patch<IGoal>(endpoint, values);
};

export default editGoal;
