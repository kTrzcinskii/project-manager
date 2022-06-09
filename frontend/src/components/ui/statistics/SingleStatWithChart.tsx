import { VStack, Text, Box } from "@chakra-ui/react";
import { projectsObject } from "../../../interfaces/IMainStats";
import { PieChart } from "react-minimal-pie-chart";
import { Data } from "react-minimal-pie-chart/types/commonTypes";
import { useState } from "react";

interface SingleStatWithChartProps {
  data: projectsObject;
  title: string;
  color: string;
}

const SingleStatWithChart: React.FC<SingleStatWithChartProps> = ({
  data,
  title,
  color,
}) => {
  const charData: Data = [
    { title: "High", value: data.highPriority, color: "#E38627" },
    { title: "Medium", value: data.mediumPriority, color: "#C13C37" },
    { title: "Low", value: data.lowPriority, color: "#6A2135" },
  ];

  const [currentHoverIndex, setCurrentHoverIndex] = useState<number | null>(
    null
  );

  return (
    <VStack>
      <Text fontWeight='semibold' color={`${color}.800`} fontSize='3xl'>
        {data.all}
      </Text>
      <Text fontSize='xl' color={`${color}.600`}>
        {title}
      </Text>
      <Box maxW='183px'>
        <PieChart
          data={charData}
          onMouseOver={(e, index) => {
            setCurrentHoverIndex(index);
          }}
          onMouseOut={() => {
            setCurrentHoverIndex(null);
          }}
          label={(props) =>
            currentHoverIndex === props.dataIndex ? props.dataEntry.title : ""
          }
          labelStyle={{ fontSize: 10 }}
        />
      </Box>
    </VStack>
  );
};

export default SingleStatWithChart;
