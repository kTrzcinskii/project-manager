import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import LoadingSpinner from "../utils/LoadingSpinner";
import ProjectCard from "./ProjectCard";
import IAllProjects from "../../../interfaces/IAllProjects";
interface ProjectsContainerProps {
  page: number;
  query: string;
  data: IAllProjects | undefined;
  isError: boolean;
  isLoading: boolean;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  page,
  query,
  data,
  isError,
  isLoading,
}) => {
  if (isError) {
    return (
      <Box pt={{ base: 90, md: 160, lg: 200 }} w='80%' mx='auto'>
        <Heading
          textAlign='center'
          color='teal.900'
          fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
        >
          Server Error
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          textAlign='center'
          color='gray.800'
        >
          Sorry, we cannot reach our server right now. Please try again later.
        </Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        mt={{ base: 20, md: 40, lg: 60 }}
      >
        <LoadingSpinner />
      </Flex>
    );
  }

  if (data?.projects.length === 0) {
    //TODO
    if (!query) {
      return <>USER HAS 0 PROJECTS - create project btn</>;
    }
    //TODO
    return (
      <>USER HAS FILTERS THAT RETURN 0 PROJECT - NO PROJECT MET CRITERIA</>
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
