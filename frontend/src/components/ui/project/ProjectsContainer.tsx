import useGetProjects from "../../../hooks/query/useGetProjects";
import { Flex, Grid, Spinner } from "@chakra-ui/react";
interface ProjectsContainerProps {
  page: number;
  query: string;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  page,
  query,
}) => {
  const { data, isLoading, isError } = useGetProjects(page, query);

  if (isError) {
    return <></>;
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
        <Spinner
          thickness='5px'
          speed='0.65s'
          emptyColor='gray.200'
          color='teal.500'
          boxSize={100}
        />
      </Flex>
    );
  }

  return <Grid></Grid>;
};

export default ProjectsContainer;
