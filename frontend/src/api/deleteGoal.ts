import IProject from "../interfaces/IProject";
import axiosInstance from "../utils/axiosInstance";

const deleteGoal = (id: number) => {
  const endpoint = `/goal/${id}`;

  return axiosInstance.delete<IProject>(endpoint);
};

export default deleteGoal;
