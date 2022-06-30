import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "../src/components/sections/Sidebar";
import ChooseDate from "../src/components/ui/statistics/ChooseDate";
import GoalsStats from "../src/components/ui/statistics/GoalsStats";
import ProjectsStats from "../src/components/ui/statistics/ProjectsStats";
import ErrorMessage from "../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../src/components/ui/utils/LoadingSpinner";
import useGetMainStats from "../src/hooks/query/useGetMainStats";
import useMe from "../src/hooks/query/useMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";

const Statistics: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  const {
    data: dataAuth,
    isError: isErrorAuth,
    isLoading: isLoadingAuth,
  } = useMe();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [dateType, setDateType] = useState<"specific-date" | "date-range">(
    "date-range"
  );

  const { data, isLoading, isError } = useGetMainStats(query);

  if (isLoadingAuth) {
    return (
      <Flex h='100vh' w='full' justifyContent='center' alignItems='center'>
        <LoadingSpinner />
      </Flex>
    );
  }
  if (!dataAuth || isErrorAuth) {
    router.push("/unauthorized");
    return <ErrorMessage />;
  }

  if (isError || isLoading) {
    return (
      <>
        <Head>
          <title>Statistics</title>
        </Head>
        <Sidebar>
          <Flex minH={minH} justifyContent='center' alignItems='center'>
            {isError && <ErrorMessage />}
            {isLoading && <LoadingSpinner />}
          </Flex>
        </Sidebar>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>Statistics</title>
        </Head>
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
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Statistics</title>
      </Head>
      <Sidebar>
        <VStack
          minH={minH}
          spacing={{ base: 6, md: 10, lg: 14 }}
          pt={{ base: 3, md: 6 }}
          overflow='hidden'
        >
          <Heading color='teal.600' fontSize={{ base: "3xl", md: "4xl" }}>
            Your statistics
          </Heading>
          <ChooseDate
            dateType={dateType}
            setDateType={setDateType}
            isCustomInput={isCustomInput}
            setIsCustomInput={setIsCustomInput}
            setQuery={setQuery}
          />
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
    </>
  );
};

export default Statistics;
