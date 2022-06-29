import { Flex, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../src/components/sections/Sidebar";
import Header from "../src/components/ui/home/Header";
import ProjectsWrapper from "../src/components/ui/project/ProjectsWrapper";
import ErrorMessage from "../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../src/components/ui/utils/LoadingSpinner";
import useMe from "../src/hooks/query/useMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";

const Finished: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  const { data, isError, isLoading } = useMe();
  const router = useRouter();

  if (isLoading) {
    return (
      <Flex h='full' w='full' justifyContent='center' alignItems='center'>
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
        <title>Finished Projects</title>
      </Head>
      <Sidebar>
        <VStack spacing={{ base: 5, md: 10 }} minH={minH}>
          <Header
            username={data.username}
            constantText='here are your completed projects!'
          />
          <ProjectsWrapper
            title='Finished Projects'
            query='&status=finished'
            showFavoriteFilter={true}
          />
        </VStack>
      </Sidebar>
    </>
  );
};

export default Finished;
