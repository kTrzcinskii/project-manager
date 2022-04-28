import axios from "axios";
import meServerSideAPI from "../api/meServerSide";
import refreshTokensServerSide from "../api/refreshTokensServerSide";
import transfromCookiesServerSide from "./transformCookiesServerSide";

export default async function isUserLoggedIn(cookies: string) {
  try {
    const user = (await meServerSideAPI(cookies)).data;
    return { logged: true, user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data.statusCode === 401) {
      const newCookies = transfromCookiesServerSide(
        await refreshTokensServerSide(cookies)
      );
      try {
        const user = (await meServerSideAPI(newCookies)).data;
        return { logged: true, user };
      } catch (error) {
        return { logged: false, user: {} };
      }
    }
    return { logged: false, user: {} };
  }
}
