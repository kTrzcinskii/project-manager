import { Text, Box, Stack, VStack } from "@chakra-ui/react";
import { projectsObject } from "../../../interfaces/IMainStats";
import { PieChart } from "react-minimal-pie-chart";
import { Data } from "react-minimal-pie-chart/types/commonTypes";
import { useState } from "react";
import getColorsForPie from "../../../utils/getColorsForPie";
import LegendElement from "./LegendElement";
import { motion } from "framer-motion";

interface SingleStatWithChartProps {
  data: projectsObject;
  title: string;
  color: string;
  index: number;
  textDuration: number;
}

const SingleStatWithChart: React.FC<SingleStatWithChartProps> = ({
  data,
  title,
  color,
  index,
  textDuration,
}) => {
  const colors = getColorsForPie(color);

  const charData: Data = [
    { title: "High", value: data.highPriority, color: colors.high },
    { title: "Medium", value: data.mediumPriority, color: colors.medium },
    { title: "Low", value: data.lowPriority, color: colors.low },
  ];

  const [currentHoverIndex, setCurrentHoverIndex] = useState<number | null>(
    null
  );
  return (
    <Stack
      direction={{ base: "column", md: "column", lg: "row", xl: "column" }}
      spacing={{ base: 4, md: 5, lg: 6, xl: 4 }}
      justifyContent='space-around'
      as={motion.div}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.2,
            delay: textDuration + 0.1 + index * 0.2,
          },
        },
      }}
      initial='hidden'
      animate='visible'
    >
      <VStack justifyContent='center' minW='150px'>
        <Text fontWeight='semibold' color={`${color}.800`} fontSize='3xl'>
          {data.all}
        </Text>
        <Text fontSize='xl' color={`${color}.600`}>
          {title}
        </Text>
      </VStack>
      <Stack
        direction={{ base: "row", md: "row", lg: "row", xl: "column" }}
        spacing={7}
        justifyContent='center'
      >
        <Box maxW='183px'>
          <PieChart
            data={charData}
            onMouseOver={(_, index) => {
              setCurrentHoverIndex(index);
            }}
            onMouseOut={() => {
              setCurrentHoverIndex(null);
            }}
            label={(props) =>
              currentHoverIndex === props.dataIndex ? props.dataEntry.value : ""
            }
            labelStyle={{ fontSize: 14, color: colors.font }}
          />
        </Box>
        <VStack justifyContent='center'>
          <LegendElement
            priority='high'
            color={colors.high}
            fontColor={colors.font}
          />
          <LegendElement
            priority='medium'
            color={colors.medium}
            fontColor={colors.font}
          />
          <LegendElement
            priority='low'
            color={colors.low}
            fontColor={colors.font}
          />
        </VStack>
      </Stack>
    </Stack>
  );
};

export default SingleStatWithChart;
