import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGetProjects from "../../../hooks/query/useGetProjects";
import transfromMonthNumberToString from "../../../utils/transfromMonthNumberToString";
import FilterBar from "./FilterBar";
import ProjectsContainer from "./ProjectsContainer";

interface ProjectsWrapperProps {
  title: "Projects" | "Finished" | "In Progress" | "Backlog";
  query: string;
}

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = ({
  title,
  query: propQuery,
}) => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState(propQuery);

  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = transfromMonthNumberToString(today.getMonth());
    setDate(`${month}, ${year}`);
  }, []);

  const { data, isLoading, isError } = useGetProjects(page, query);

  return (
    <VStack
      minH='full'
      alignItems='flex-start'
      w='90%'
      bgColor='white'
      borderRadius='lg'
      justifyContent='flex-start'
      flex={1}
      overflowX='hidden'
    >
      <Container maxW='container.lg' flex={1} minH='full'>
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
        <ProjectsContainer
          query={query}
          page={page}
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
        <HStack spacing={3} w='full' justifyContent='center' pb={4}>
          <IconButton
            aria-label='Go to previous page'
            icon={<ChevronLeftIcon boxSize={8} />}
            rounded='lg'
            size='lg'
            disabled={page === 0 ? true : false}
            onClick={() => setPage((page) => page - 1)}
            color='teal.700'
            _focus={{ ring: 3, ringColor: "teal.700" }}
          />
          <IconButton
            aria-label='Go to next page'
            icon={<ChevronRightIcon boxSize={8} />}
            rounded='lg'
            size='lg'
            disabled={!data?.hasMore}
            onClick={() => setPage((page) => page + 1)}
            color='teal.700'
            _focus={{ ring: 3, ringColor: "teal.700" }}
          />
        </HStack>
      </Container>
    </VStack>
  );
};

export default ProjectsWrapper;
