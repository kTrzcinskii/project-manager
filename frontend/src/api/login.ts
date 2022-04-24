import axios from "axios";
import ILoginFormValues from "../lib/interfaces/ILoginFormValues";

const endpoint = `${process.env.BACKEND_ENDPOINT}/auth/local/signin`;

const loginAPI = (values: ILoginFormValues) => {
  return axios.post(endpoint, values);
};

export default loginAPI;
