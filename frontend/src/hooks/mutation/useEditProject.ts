import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import editProject from "../../api/editProject";
import IEditProjectValues from "../../interfaces/IEditProjectValues";
import IProject from "../../interfaces/IProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useEditProject(id: number) {
  return useMutation<
    AxiosResponse<IProject, any>,
    Error | AxiosError<IServerErrorResponse>,
    IEditProjectValues
  >(async (values: IEditProjectValues) => editProject(id, values));
}
