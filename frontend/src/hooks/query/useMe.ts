import { AxiosError } from "axios";
import { useQuery } from "react-query";
import meClientSide from "../../api/meClientSide";
import IMe from "../../interfaces/IMe";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useMe() {
  return useQuery<IMe, Error | AxiosError<IServerErrorResponse>>(
    ["me"],
    async () => meClientSide()
  );
}
