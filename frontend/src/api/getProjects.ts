import IAllProjects from "../interfaces/IAllProjects";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/projects?limit=6";

const getProjects = async (page: number, query?: string) => {
  let myEndpoint = endpoint;
  if (query) {
    myEndpoint += query;
  }
  myEndpoint += `&page=${page}`;

  const response = await axiosInstance.get<IAllProjects>(myEndpoint);

  return response.data;
};

export default getProjects;
