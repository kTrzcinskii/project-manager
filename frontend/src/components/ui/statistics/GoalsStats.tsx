import { Stack, Text, VStack, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
  const percent = Math.floor((completedGoalsNumber / allGoalsNumber) * 100);

  const text =
    percent >= 50
      ? "Keep up this great work!"
      : "Let's try to make more of it, shall we?";

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
            translateX: "80%",
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
          initialDelay={textDuration}
          index={3}
        />
        <SingleStatNumber
          data={createdGoalsNumber}
          title='Created Goals'
          color='yellow'
          initialDelay={textDuration}
          index={2}
        />
        <SingleStatNumber
          data={updatedGoalsNumber}
          title='Updated Goals'
          color='purple'
          initialDelay={textDuration}
          index={1}
        />
        <SingleStatNumber
          data={completedGoalsNumber}
          title='Completed Goals'
          color='pink'
          initialDelay={textDuration}
          index={0}
        />
      </Stack>
      {percent && percent !== NaN && (
        <Text
          pt={10}
          pb={12}
          color='teal.600'
          fontStyle='italic'
          fontSize='xl'
          as={motion.p}
          variants={{
            hidden: {
              opacity: 0,
              translateY: "-80%",
            },
            visible: {
              opacity: 1,
              translateY: "0%",
              transition: {
                delay: 4 * 0.2 + 0.1,
                duration: textDuration,
              },
            },
          }}
          initial='hidden'
          animate='visible'
        >
          You have completed{" "}
          <chakra.span fontWeight='semibold' color='teal.700'>
            {percent}%
          </chakra.span>{" "}
          of your goals. {text}
        </Text>
      )}
    </VStack>
  );
};

export default GoalsStats;
