import { HStack, Box, VStack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage, NextPageContext } from "next";
import Sidebar from "../../src/components/sections/Sidebar";
import minHonPagesWithSidebar from "../../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../../src/utils/server-side/setCookiesServerSide";
import Image from "next/image";
import edit_project_image from "../../public/images/edit_project_image.svg";
import EditProjectForm from "../../src/components/sections/EditProjectForm";
import Head from "next/head";

const EditProject: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  return (
    <>
      <Head>
        <title>Edit Project</title>
      </Head>
      <Sidebar>
        <HStack
          minH={minH}
          w='100%'
          bgColor='white'
          px={{ base: 0, md: 0, lg: 5 }}
          justifyContent={{
            base: "center",
            md: "center",
            lg: "center",
            xl: "space-around",
          }}
        >
          <VStack>
            <Heading
              color='teal.700'
              pt={8}
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              as={motion.h1}
              initial={{
                opacity: 0,
                translateY: "-150%",
              }}
              animate={{
                opacity: 1,
                translateY: "0%",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              Edit Project
            </Heading>
            <EditProjectForm />
          </VStack>
          <Box w={{ base: 0, md: 0, lg: "0", xl: "400px" }}>
            <Image
              src={edit_project_image}
              alt='Working man'
              layout='responsive'
            />
          </Box>
        </HStack>
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

export default EditProject;
