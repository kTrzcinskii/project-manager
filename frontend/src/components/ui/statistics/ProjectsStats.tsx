import { Stack, VStack, Text } from "@chakra-ui/react";
import { projectsObject } from "../../../interfaces/IMainStats";
import SingleStatWithChart from "./SingleStatWithChart";

interface ProjectsStatsProps {
  allProjectsNumber: projectsObject;
  createdProjectsNumber: projectsObject;
  completedProjectsNumber: projectsObject;
  updatedProjectsNumber: projectsObject;
}

const ProjectsStats: React.FC<ProjectsStatsProps> = ({
  allProjectsNumber,
  createdProjectsNumber,
  completedProjectsNumber,
  updatedProjectsNumber,
}) => {
  return (
    <VStack spacing={{ base: 3, md: 4, lg: 5 }} w='90%'>
      <Text w='full' color='teal.600' fontSize={{ base: "xl", md: "2xl" }}>
        Projects&apos; Stats
      </Text>
      <Stack
        direction={{ base: "column", md: "column", lg: "column", xl: "row" }}
        spacing={{ base: 8, md: 10, lg: 10, xl: 6 }}
        justifyContent='space-between'
        w='90%'
      >
        <SingleStatWithChart
          data={allProjectsNumber}
          title='All Projects'
          color='blue'
        />
        <SingleStatWithChart
          data={createdProjectsNumber}
          title='Created Projects'
          color='yellow'
        />
        <SingleStatWithChart
          data={updatedProjectsNumber}
          title='Updated Projects'
          color='purple'
        />
        <SingleStatWithChart
          data={completedProjectsNumber}
          title='Completed Projects'
          color='pink'
        />
      </Stack>
    </VStack>
  );
};

export default ProjectsStats;
