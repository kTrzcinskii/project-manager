import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import Sidebar from "../src/components/sections/Sidebar";
import IMe from "../src/interfaces/IMe";
import isUserLoggedIn from "../src/utils/isUserLoggedIn";
import redirectServerSide from "../src/utils/redirectServerSide";
import setCookiesServerSide from "../src/utils/setCookiesServerSide";

const Settings: NextPage<{
  user: IMe;
}> = ({ user }) => {
  return (
    <Sidebar>
      <VStack minH={{ base: "calc(100vh - 112px)", md: "calc(100vh - 32px)" }}>
        <Heading color='teal.600'>Account Settings</Heading>
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

export default Settings;
