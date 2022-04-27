import { AxiosError } from "axios";
import IServerErrorResponse from "../interfaces/IServerErrorResponse";

export default function transfromAPIErrors(
  error: AxiosError<IServerErrorResponse, any>,
  possbileFields: string[]
) {
  if (typeof error.response?.data.message === "string") {
    let errorField: string = "";
    possbileFields.forEach((field) => {
      if (error.response?.data.message.includes(field)) {
        errorField = field;
      }
    });
    let returnObj: any = {};
    returnObj[errorField] = error.response.data.message;
    return returnObj;
  } else {
    let returnObj: any = {};
    error.response?.data.message.forEach((message) => {
      let errorField: string = "";
      possbileFields.forEach((field) => {
        if (message.includes(field)) {
          errorField = field;
        }
      });
      returnObj[errorField] = message;
    });
    return returnObj;
  }
}
