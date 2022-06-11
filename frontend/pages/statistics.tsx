import { Heading, HStack, VStack, Text, Flex, Button } from "@chakra-ui/react";
import type { NextPage, NextPageContext } from "next";
import { useState } from "react";
import Sidebar from "../src/components/sections/Sidebar";
import ErrorMessage from "../src/components/ui/utils/ErrorMessage";
import GoalsStats from "../src/components/ui/statistics/GoalsStats";
import ProjectsStats from "../src/components/ui/statistics/ProjectsStats";
import SelectQuery from "../src/components/ui/statistics/SelectQuery";
import LoadingSpinner from "../src/components/ui/utils/LoadingSpinner";
import useGetMainStats from "../src/hooks/query/useGetMainStats";
import IMe from "../src/interfaces/IMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../src/utils/server-side/setCookiesServerSide";
import { useRouter } from "next/router";

const Statistics: NextPage<{ user: IMe }> = ({ user }) => {
  const minH = minHonPagesWithSidebar;

  const [query, setQuery] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);

  const { data, isLoading, isError } = useGetMainStats(query);

  const router = useRouter();

  if (!data) {
    return (
      <Sidebar>
        <Flex
          minH={minH}
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            textAlign='center'
            color='gray.800'
          >
            It looks like there are no statistics to show yet. Change it by
            creating new project!
          </Text>
          <Button
            mt={5}
            colorScheme='teal'
            _focus={{ ring: 3, ringColor: "teal.700" }}
            onClick={() => router.push("/create-project")}
          >
            Create New Project
          </Button>
        </Flex>
      </Sidebar>
    );
  }

  if (isError || isLoading) {
    return (
      <Sidebar>
        <Flex minH={minH} justifyContent='center' alignItems='center'>
          {isError && <ErrorMessage />}
          {isLoading && <LoadingSpinner />}
        </Flex>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <VStack
        minH={minH}
        spacing={{ base: 6, md: 10, lg: 14 }}
        pt={{ base: 3, md: 6 }}
      >
        <Heading color='teal.600' fontSize={{ base: "3xl", md: "4xl" }}>
          Your statistics
        </Heading>
        <VStack>
          <HStack mx='auto'>
            <Text>From </Text>
            <SelectQuery
              setQuery={setQuery}
              setIsCustomInput={setIsCustomInput}
            />
          </HStack>
          {/* {//TODO: CUSTOM INPUT } */}
          {isCustomInput && <Text>CUSTOM INPUT</Text>}
        </VStack>
        <VStack w='full' spacing={5}>
          <ProjectsStats
            allProjectsNumber={data.allProjectsNumber}
            completedProjectsNumber={data.completedProjectsNumber}
            createdProjectsNumber={data.createdProjectsNumber}
            updatedProjectsNumber={data.updatedProjectsNumber}
          />
          <GoalsStats
            allGoalsNumber={data.allGoalsNumber}
            completedGoalsNumber={data.completedGoalsNumber}
            createdGoalsNumber={data.createdGoalsNumber}
            updatedGoalsNumber={data.updatedGoalsNumber}
          />
        </VStack>
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

export default Statistics;
