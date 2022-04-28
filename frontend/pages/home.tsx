import { AxiosResponse } from "axios";
import type { NextPage, NextPageContext } from "next";
import refreshTokensServerSide from "../src/api/refreshTokensServerSide";
import IMe from "../src/interfaces/IMe";
import isUserLoggedIn from "../src/utils/isUserLoggedIn";
import setCookiesServerSide from "../src/utils/setCookiesServerSide";
import transfromCookiesServerSide from "../src/utils/transformCookiesServerSide";

const Home: NextPage<{
  logged: boolean;
  user: IMe | undefined;
}> = ({ logged, user }) => {
  if (!logged || !user) {
    return <>not logged</>;
  }

  return <>Welcome {user.username}</>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  let cookies = ctx.req?.headers.cookie;

  if (!cookies) {
    return { props: { logged: false, user: {} } };
  }

  if (!cookies.includes("at=") && cookies.includes("rt=")) {
    cookies = await setCookiesServerSide(ctx, cookies);
  }

  const { logged, user } = await isUserLoggedIn(cookies);

  return { props: { logged, user } };
}

export default Home;
