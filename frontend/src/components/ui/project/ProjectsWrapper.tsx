import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import transfromMonthNumberToString from "../../../utils/transfromMonthNumberToString";
import FilterBar from "./FilterBar";
import ProjectsContainer from "./ProjectsContainer";

interface ProjectsWrapperProps {
  title: "Projects" | "Finished" | "In Progress" | "Backlog";
}

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = ({ title }) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = transfromMonthNumberToString(today.getMonth());
    setDate(`${month}, ${year}`);
  }, []);

  return (
    <VStack
      h='full'
      alignItems='flex-start'
      w='90%'
      bgColor='white'
      borderRadius='lg'
      justifyContent='flex-start'
      flex={1}
    >
      <Container maxW='container.lg' flex={1} h='full' position='relative'>
        <HStack
          justifyContent='space-between'
          w='full'
          mt={{ base: 5, md: 8, lg: 10 }}
          fontWeight='semibold'
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          px={5}
        >
          <Text>{title}</Text>
          <Text>{date}</Text>
        </HStack>
        <Box w='full'>
          <FilterBar />
        </Box>
        <ProjectsContainer query={query} page={page} />
      </Container>
    </VStack>
  );
};

export default ProjectsWrapper;
