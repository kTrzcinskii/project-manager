import { NextPageContext } from "next";
import refreshTokensServerSide from "../api/refreshTokensServerSide";
import transfromCookiesServerSide from "./transformCookiesServerSide";

export default async function setCookiesServerSide(
  ctx: NextPageContext,
  cookies: string
) {
  const newCookies = transfromCookiesServerSide(
    await refreshTokensServerSide(cookies)
  );

  const splitedCookies: string[] = newCookies.split("; ");

  ctx.res?.setHeader("set-cookie", [splitedCookies[0], splitedCookies[1]]);

  return newCookies;
}
