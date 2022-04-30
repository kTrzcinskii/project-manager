import type { NextPage, NextPageContext } from "next";
import Sidebar from "../src/components/sections/Sidebar";
import IMe from "../src/interfaces/IMe";
import isUserLoggedIn from "../src/utils/isUserLoggedIn";
import setCookiesServerSide from "../src/utils/setCookiesServerSide";

const Home: NextPage<{
  logged: boolean;
  user: IMe | null;
}> = ({ logged, user }) => {
  if (!logged || !user) {
    return (
      <Sidebar>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
        <h1>not logged</h1>
      </Sidebar>
    );
  }

  return <Sidebar>Welcome {user.username}</Sidebar>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  let cookies = ctx.req?.headers.cookie;

  if (!cookies) {
    return { props: { logged: false, user: null } };
  }

  if (!cookies.includes("at=") && cookies.includes("rt=")) {
    cookies = await setCookiesServerSide(ctx, cookies);
  }

  const { logged, user } = await isUserLoggedIn(cookies);

  return { props: { logged, user } };
}

export default Home;
