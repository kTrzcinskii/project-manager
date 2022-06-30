import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import create_project_image from "../public/images/create_project_image.svg";
import CreateProjectForm from "../src/components/sections/CreateProjectForm";
import Sidebar from "../src/components/sections/Sidebar";
import ErrorMessage from "../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../src/components/ui/utils/LoadingSpinner";
import useMe from "../src/hooks/query/useMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";

const CreateProject: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  const { data, isError, isLoading } = useMe();
  const router = useRouter();

  if (isLoading) {
    return (
      <Flex h='100vh' w='full' justifyContent='center' alignItems='center'>
        <LoadingSpinner />
      </Flex>
    );
  }
  if (!data || isError) {
    router.push("/unauthorized");
    return <ErrorMessage />;
  }

  return (
    <>
      <Head>
        <title>Create New Project</title>
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
          <Box w={{ base: 0, md: 0, lg: "0", xl: "400px" }}>
            <Image
              src={create_project_image}
              alt='Working man'
              layout='responsive'
            />
          </Box>
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
              Create New Project
            </Heading>
            <CreateProjectForm />
          </VStack>
        </HStack>
      </Sidebar>
    </>
  );
};

export default CreateProject;
