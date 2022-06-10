import { Stack, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
  const textDuration = 0.2;

  return (
    <VStack spacing={{ base: 3, md: 4, lg: 5 }} w='90%'>
      <Text
        w='full'
        color='teal.600'
        fontSize={{ base: "xl", md: "2xl" }}
        as={motion.p}
        variants={{
          hidden: {
            opacity: 0,
            translateX: "-80%",
          },
          visible: {
            opacity: 1,
            translateX: "0%",
            transition: {
              duration: textDuration,
            },
          },
        }}
        initial='hidden'
        animate='visible'
      >
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
          textDuration={textDuration}
          index={0}
        />
        <SingleStatWithChart
          data={createdProjectsNumber}
          title='Created Projects'
          color='yellow'
          textDuration={textDuration}
          index={1}
        />
        <SingleStatWithChart
          data={updatedProjectsNumber}
          title='Updated Projects'
          color='purple'
          textDuration={textDuration}
          index={2}
        />
        <SingleStatWithChart
          data={completedProjectsNumber}
          title='Completed Projects'
          color='pink'
          textDuration={textDuration}
          index={3}
        />
      </Stack>
    </VStack>
  );
};

export default ProjectsStats;
