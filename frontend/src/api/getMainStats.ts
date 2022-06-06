import axiosInstance from "../utils/axiosInstance";
import IMainStats from "../interfaces/IMainStats";

const getMainStats = async (query?: string) => {
  const addToEndpoit = query ? query : "";

  const endpoint = "/stats" + addToEndpoit;
  const response = await axiosInstance.get<IMainStats>(endpoint);

  return response.data;
};

export default getMainStats;
