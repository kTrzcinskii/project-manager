import ICreateProjectValues from "../interfaces/ICreateProjectValues";
import IProject from "../interfaces/IProject";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/projects/create";

const createProject = (values: ICreateProjectValues) => {
  return axiosInstance.post<IProject>(endpoint, values);
};

export default createProject;
