import IProject from "../interfaces/IProject";
import axiosInstance from "../utils/axiosInstance";

const getSingleProject = async (id: number) => {
  const endpoint = `/projects/${id}`;

  const response = await axiosInstance.get<IProject>(endpoint);

  return response.data;
};

export default getSingleProject;
