import axios from "axios";
import ISuccessful from "../interfaces/ISuccessful";

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/refresh`;

const refreshTokens = (failedRequest: any) => {
  return axios.post<ISuccessful>(endpoint, {}, { withCredentials: true });
};

export default refreshTokens;
