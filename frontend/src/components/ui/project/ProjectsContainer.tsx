import { Flex, Grid, GridItem } from "@chakra-ui/react";
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
    //TODO
    return <>ERROR</>;
  }

  if (isLoading) {
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        mt={20}
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
