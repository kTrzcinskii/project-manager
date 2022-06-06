import ISingleProjectStats from "../interfaces/ISingleProjectStats";
import axiosInstance from "../utils/axiosInstance";

const getSingleProjectStats = async (projectId: number, query?: string) => {
  const addToEndpoit = query ? query : "";

  const endpoint = `/stats/project/${projectId}` + addToEndpoit;

  const response = await axiosInstance.get<ISingleProjectStats>(endpoint);
  return response.data;
};

export default getSingleProjectStats;
