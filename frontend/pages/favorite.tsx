import { VStack } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Sidebar from "../src/components/sections/Sidebar";
import Header from "../src/components/ui/home/Header";
import ProjectsWrapper from "../src/components/ui/project/ProjectsWrapper";
import IMe from "../src/interfaces/IMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";

const Favorite: NextPage<{
  user: IMe;
}> = ({ user }) => {
  const minH = minHonPagesWithSidebar;

  return (
    <>
      <Head>
        <title>Favorite Projects</title>
      </Head>
      <Sidebar>
        <VStack spacing={{ base: 5, md: 10 }} minH={minH}>
          <Header
            username={user.username}
            constantText="let's take a look at your favorites!"
          />
          <ProjectsWrapper
            title='Favorite Projects'
            query='&favorite=true'
            showFavoriteFilter={false}
          />
        </VStack>
      </Sidebar>
    </>
  );
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

export default Favorite;
