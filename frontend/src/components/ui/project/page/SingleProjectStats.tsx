import { Flex, Stack } from "@chakra-ui/react";
import useGetSingleProjectStats from "../../../../hooks/query/useGetSingleProjectStats";
import SingleStatNumber from "../../statistics/SingleStatNumber";
import ErrorMessage from "../../utils/ErrorMessage";
import LoadingSpinner from "../../utils/LoadingSpinner";

interface SingleProjectStatsProps {
  id: number;
  query: string;
}

const SingleProjectStats: React.FC<SingleProjectStatsProps> = ({
  id,
  query,
}) => {
  const { data, isLoading, isError } = useGetSingleProjectStats(id, query);

  if (isLoading || isError || !data) {
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorMessage />}
      </Flex>
    );
  }

  return (
    <Stack
      direction={{ base: "column", md: "column", lg: "row" }}
      spacing={{ base: 5, md: 6, lg: 0 }}
      justifyContent='space-between'
      w='90%'
    >
      <SingleStatNumber
        data={data.createdGoalsNumber}
        title='Created Goals'
        color='blue'
        duration={0}
        gap={0}
      />
      <SingleStatNumber
        data={data.updatedGoalsNumber}
        title='Updated Goals'
        color='yellow'
        duration={0}
        gap={0}
      />
      <SingleStatNumber
        data={data.completedGoalsNumber}
        title='Completed Goals'
        color='purple'
        duration={0}
        gap={0}
      />
    </Stack>
  );
};

export default SingleProjectStats;
