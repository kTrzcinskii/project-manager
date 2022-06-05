import { VStack } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import Sidebar from "../src/components/sections/Sidebar";
import Header from "../src/components/ui/home/Header";
import ProjectsWrapper from "../src/components/ui/project/ProjectsWrapper";
import IMe from "../src/interfaces/IMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";

const Finished: NextPage<{
  user: IMe;
}> = ({ user }) => {
  const minH = minHonPagesWithSidebar;

  return (
    <Sidebar>
      <VStack spacing={{ base: 5, md: 10 }} minH={minH}>
        <Header
          username={user.username}
          constantText='here are your completed projects!'
        />
        <ProjectsWrapper
          title='Finished Projects'
          query='&status=finished'
          showFavoriteFilter={true}
        />
      </VStack>
    </Sidebar>
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

export default Finished;
