import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import useGetSingleProjectStats from "../../../../hooks/query/useGetSingleProjectStats";
import ChooseDate from "../../statistics/ChooseDate";
import SingleStatNumber from "../../statistics/SingleStatNumber";
import ErrorMessage from "../../utils/ErrorMessage";
import LoadingSpinner from "../../utils/LoadingSpinner";

interface SingleProjectStatsProps {
  id: number;
  color?: string;
}

const SingleProjectStats: React.FC<SingleProjectStatsProps> = ({
  id,
  color = "teal",
}) => {
  const [query, setQuery] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [dateType, setDateType] = useState<"specific-date" | "date-range">(
    "date-range"
  );

  const { data, isLoading, isError } = useGetSingleProjectStats(id, query);

  if (isLoading || isError || !data) {
    return <></>;
  }

  return (
    <>
      <Heading color={`${color}.600`} fontSize={{ base: "xl", md: "2xl" }}>
        Project&apos;s Stats
      </Heading>
      <ChooseDate
        dateType={dateType}
        setDateType={setDateType}
        isCustomInput={isCustomInput}
        setIsCustomInput={setIsCustomInput}
        setQuery={setQuery}
        color={color}
      />
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
    </>
  );
};

export default SingleProjectStats;
