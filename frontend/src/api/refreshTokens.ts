import axios from "axios";
import ISuccessful from "../interfaces/ISuccessful";
import ISuccessfulWithTokens from "../interfaces/ISuccessfulWithTokens";
import { setCookies } from "cookies-next";

const endpoint = "/api/auth/refresh";

const refreshTokens = async (_failedRequest: any) => {
  try {
    const response = await axios.post<ISuccessfulWithTokens>(
      endpoint,
      {},
      { withCredentials: true }
    );
    if (response.data.tokens.access_token) {
      setCookies("at", response.data.tokens.access_token);
    }
    if (response.data.tokens.refresh_token) {
      setCookies("rt", response.data.tokens.refresh_token);
    }
  } catch (error) {
    console.error(error);
  }
};

export default refreshTokens;
