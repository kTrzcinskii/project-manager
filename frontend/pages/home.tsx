import type { NextPage, NextPageContext } from "next";
import Sidebar from "../src/components/sections/Sidebar";
import IMe from "../src/interfaces/IMe";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";

const Home: NextPage<{
  user: IMe;
}> = ({ user }) => {
  return <Sidebar>Welcome {user.username}</Sidebar>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  let cookies = ctx.req?.headers.cookie;

  if (!cookies) {
    return redirectServerSide("/unauthorized");
  }

  if (!cookies.includes("at=") && cookies.includes("rt=")) {
    cookies = await setCookiesServerSide(ctx, cookies);
  }

  const { logged, user } = await isUserLoggedIn(cookies);

  if (!logged || !user) {
    return redirectServerSide("/unauthorized");
  }

  return { props: { user } };
}

export default Home;
