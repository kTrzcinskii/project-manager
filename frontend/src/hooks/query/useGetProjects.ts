import { AxiosError } from "axios";
import { useQuery } from "react-query";
import getProjects from "../../api/getProjects";
import IAllProjects from "../../interfaces/IAllProjects";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useGetProjects(page: number, query?: string) {
  return useQuery<IAllProjects, Error | AxiosError<IServerErrorResponse>>(
    ["allProjects", page, query],
    () => getProjects(page, query),
    { keepPreviousData: true, staleTime: 5000, refetchInterval: 30000 }
  );
}
