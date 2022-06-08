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
        direction={{ base: "column", md: "column", lg: "row" }}
        // spacing={{ base: 5, md: 6, lg: 8 }}
        justifyContent='space-between'
        w='full'
      >
        <SingleStatWithChart data={allProjectsNumber} title='All Projects' />
        <SingleStatWithChart
          data={createdProjectsNumber}
          title='Created Projects'
        />
        <SingleStatWithChart
          data={updatedProjectsNumber}
          title='Updated Projects'
        />
        <SingleStatWithChart
          data={completedProjectsNumber}
          title='Completed Projects'
        />
      </Stack>
    </VStack>
  );
};

export default ProjectsStats;
