import { useQuery } from "react-query";
import { AxiosError } from "axios";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import ISingleProjectStats from "../../interfaces/ISingleProjectStats";
import getSingleProjectStats from "../../api/getSingleProjectStats";

export default function useGetSingleProjectStats(
  projectId: number,
  query?: string
) {
  return useQuery<
    ISingleProjectStats,
    Error | AxiosError<IServerErrorResponse>
  >(["projectStats", projectId], () => getSingleProjectStats(projectId, query));
}
