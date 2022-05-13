import { HStack, VStack, Text, Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import transfromMonthNumberToString from "../../../utils/transfromMonthNumberToString";
import FilterBar from "./FilterBar";

interface ProjectsContainerProps {
  children?: ReactNode;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({ children }) => {
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
      <HStack
        justifyContent='space-around'
        w='full'
        mt={5}
        fontWeight='semibold'
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
      >
        <Text>Projects</Text>
        <Text>{date}</Text>
      </HStack>
      <Box w='full'>
        <FilterBar />
      </Box>
      {children}
    </VStack>
  );
};

export default ProjectsContainer;
