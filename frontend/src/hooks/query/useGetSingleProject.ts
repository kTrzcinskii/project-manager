import { AxiosError } from "axios";
import { useQuery } from "react-query";
import getSingleProject from "../../api/getSingleProject";
import IProject from "../../interfaces/IProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useGetSingleProject(id: number) {
  return useQuery<IProject, Error | AxiosError<IServerErrorResponse>>(
    ["project", id],
    () => getSingleProject(id)
  );
}
