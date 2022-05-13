import { HStack, VStack, Text, Box, Container } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import transfromMonthNumberToString from "../../../utils/transfromMonthNumberToString";
import FilterBar from "./FilterBar";

interface ProjectsContainerProps {
  title: "Projects" | "Finished" | "In Progress" | "Backlog";
  children?: ReactNode;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  children,
  title,
}) => {
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
      <Container maxW='container.lg'>
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
        {children}
      </Container>
    </VStack>
  );
};

export default ProjectsContainer;
