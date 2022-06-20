import ISuccessful from "../interfaces/ISuccessful";
import axiosInstance from "../utils/axiosInstance";

const deleteProject = (id: number) => {
  const endpoint = `/projects/delete/${id}`;

  return axiosInstance.delete<ISuccessful>(endpoint);
};

export default deleteProject;
