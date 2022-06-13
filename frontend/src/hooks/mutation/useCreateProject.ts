import { AxiosResponse, AxiosError } from "axios";
import { useMutation } from "react-query";
import createProject from "../../api/createProject";
import ICreateProjectValues from "../../interfaces/ICreateProjectValues";
import IProject from "../../interfaces/IProject";
import IServerErrorResponse from "../../interfaces/IServerErrorResponse";

export default function useCreateProject() {
  return useMutation<
    AxiosResponse<IProject, any>,
    Error | AxiosError<IServerErrorResponse>,
    ICreateProjectValues
  >(async (values) => createProject(values));
}
