import { Stack, Text, VStack, chakra } from "@chakra-ui/react";
import SingleStatNumber from "./SingleStatNumber";

interface GoalsStatsProps {
  allGoalsNumber: number;
  createdGoalsNumber: number;
  completedGoalsNumber: number;
  updatedGoalsNumber: number;
}

const GoalsStats: React.FC<GoalsStatsProps> = ({
  allGoalsNumber,
  createdGoalsNumber,
  completedGoalsNumber,
  updatedGoalsNumber,
}) => {
  const percent = Math.floor((completedGoalsNumber / createdGoalsNumber) * 100);

  const text =
    percent >= 50
      ? "Keep up this great work!"
      : "Let's try to make more of it, shall we?";

  const isAnyGoalCreated = createdGoalsNumber > 0;

  return (
    <VStack spacing={{ base: 3, md: 4, lg: 5 }} w='90%'>
      <Text w='full' color='teal.600' fontSize={{ base: "xl", md: "2xl" }}>
        Goals&apos; Stats
      </Text>
      <Stack
        direction={{ base: "column", md: "column", lg: "column", xl: "row" }}
        spacing={{ base: 5, md: 6, lg: 6, xl: 0 }}
        justifyContent='space-between'
        w='90%'
      >
        <SingleStatNumber
          data={allGoalsNumber}
          title='All Goals'
          color='blue'
        />
        <SingleStatNumber
          data={createdGoalsNumber}
          title='Created Goals'
          color='yellow'
        />
        <SingleStatNumber
          data={updatedGoalsNumber}
          title='Updated Goals'
          color='purple'
        />
        <SingleStatNumber
          data={completedGoalsNumber}
          title='Completed Goals'
          color='pink'
        />
      </Stack>
      {isAnyGoalCreated && (
        <Text mt={6} color='teal.600' fontStyle='italic' fontSize='xl'>
          You have completed{" "}
          <chakra.span fontWeight='semibold' color='teal.700'>
            {percent}%
          </chakra.span>{" "}
          of goals that you created. {text}
        </Text>
      )}
    </VStack>
  );
};

export default GoalsStats;