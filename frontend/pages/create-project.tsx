import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import CreateProjectForm from "../src/components/sections/CreateProjectForm";
import Sidebar from "../src/components/sections/Sidebar";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";

const CreateProject: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  return (
    <Sidebar>
      <VStack minH={minH} w='90%' mx='auto' bgColor='white'>
        <Heading
          color='teal.700'
          pt={8}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Create New Project
        </Heading>
        <CreateProjectForm />
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

export default CreateProject;
