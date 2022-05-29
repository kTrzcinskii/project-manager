import IEditProjectValues from "../interfaces/IEditProjectValues";
import IProject from "../interfaces/IProject";
import axiosInstance from "../utils/axiosInstance";

const editProject = (id: number, values: IEditProjectValues) => {
  const endpoint = `/projects/edit/${id}`;

  return axiosInstance.patch<IProject>(endpoint, values);
};

export default editProject;
