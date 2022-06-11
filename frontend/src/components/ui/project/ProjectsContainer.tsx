import { Button, Flex, Grid, GridItem, Text, chakra } from "@chakra-ui/react";
import LoadingSpinner from "../utils/LoadingSpinner";
import ProjectCard from "./ProjectCard";
import IAllProjects from "../../../interfaces/IAllProjects";
import { useRouter } from "next/router";
import ErrorMessage from "../utils/ErrorMessage";
import ActionMessage from "./ActionMessage";
import getPropQueryParam from "../../../utils/getPropQueryParam";
import { Dispatch, SetStateAction } from "react";
interface ProjectsContainerProps {
  page: number;
  query: string;
  data: IAllProjects | undefined;
  isError: boolean;
  isLoading: boolean;
  isSorting: boolean;
  isFiltering: boolean;
  isClearingFilters: boolean;
  propQuery: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsClearingFilters: Dispatch<SetStateAction<boolean>>;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  page,
  query,
  data,
  isError,
  isLoading,
  isSorting,
  isFiltering,
  isClearingFilters,
  propQuery,
  setQuery,
  setIsClearingFilters,
}) => {
  const router = useRouter();

  if (isLoading || isError || isSorting || isFiltering || isClearingFilters) {
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        mt={{ base: 20, md: 40, lg: 60 }}
        flexDirection='column'
      >
        {isSorting && <ActionMessage message='Sorting...' />}
        {isFiltering && <ActionMessage message='Filtering...' />}
        {isClearingFilters && <ActionMessage message='Clearing filters...' />}
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage />}
      </Flex>
    );
  }

  if (data?.projects.length === 0) {
    if (!query) {
      return (
        <Flex
          w='full'
          mx='auto'
          justifyContent='center'
          alignItems='center'
          mt={{ base: 20, md: 40, lg: 60 }}
          flexDir='column'
        >
          <Text
            textAlign='center'
            color='gray.800'
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
          >
            It looks like you haven&apos;t created any project yet - let&apos;s
            change it!
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
      );
    } else if (query === propQuery) {
      const param = getPropQueryParam(propQuery);

      return (
        <Flex
          w='full'
          mx='auto'
          justifyContent='center'
          alignItems='center'
          mt={{ base: 20, md: 40, lg: 60 }}
          flexDir='column'
        >
          <Text
            textAlign='center'
            color='gray.800'
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
          >
            It looks like you don&apos;t have any project with status{" "}
            <chakra.span color='teal.800' fontWeight='semibold'>
              {param}
            </chakra.span>
            .
          </Text>
        </Flex>
      );
    }
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        mt={{ base: 20, md: 40, lg: 60 }}
        flexDir='column'
      >
        <Text
          textAlign='center'
          color='gray.800'
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
        >
          It looks like you chose filters that don&apos;t match any project.
        </Text>
        <Button
          pt={4}
          variant='link'
          colorScheme='red'
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          onClick={() => {
            setIsClearingFilters(true);
            setQuery(propQuery);
            const timeout = setTimeout(() => setIsClearingFilters(false), 1500);
          }}
        >
          Clear Filters
        </Button>
      </Flex>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        lg: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      templateRows={{
        base: "6fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      gap={5}
      mt={5}
      pb={5}
    >
      {data?.projects.map((project, index) => {
        return (
          <GridItem key={project.id}>
            <ProjectCard {...project} index={index} page={page} query={query} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ProjectsContainer;
