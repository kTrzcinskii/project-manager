import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import Sidebar from "../src/components/sections/Sidebar";
import AccountDetails from "../src/components/ui/settings/AccountDetails";
import DeleteAccountBtn from "../src/components/ui/settings/DeleteAccountBtn";
import IMe from "../src/interfaces/IMe";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";

const Settings: NextPage<{
  user: IMe;
}> = ({ user }) => {
  return (
    <Sidebar>
      <VStack
        minH={{ base: "calc(100vh - 112px)", md: "calc(100vh - 32px)" }}
        spacing={{ base: 6, md: 10, lg: 14 }}
        pt={{ base: 3, md: 6 }}
      >
        <Heading color='teal.600' fontSize={{ base: "3xl", md: "4xl" }}>
          Account Settings
        </Heading>
        <AccountDetails user={user} />
        <DeleteAccountBtn />
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
