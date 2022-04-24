import axios from "axios";
import IRegisterFormValues from "../lib/interfaces/IRegisterFormValues";

const endpoint = `${process.env.BACKEND_ENDPOINT}/auth/local/signup`;

const registerAPI = (values: IRegisterFormValues) => {
  return axios.post(endpoint, values);
};

export default registerAPI;
