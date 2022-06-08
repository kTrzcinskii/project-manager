import { useQuery } from "react-query";
import { AxiosError } from "axios";
import IMainStats from "../../interfaces/IMainStats";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";
import getMainStats from "../../api/getMainStats";

export default function useGetMainStats(query?: string) {
  return useQuery<IMainStats, Error | AxiosError<IServerErrorResponse>>(
    ["mainStats", query],
    () => getMainStats(query),
    { keepPreviousData: true, staleTime: 5000 }
  );
}
