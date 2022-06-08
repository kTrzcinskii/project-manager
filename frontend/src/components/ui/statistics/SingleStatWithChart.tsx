import { Box } from "@chakra-ui/react";
import { projectsObject } from "../../../interfaces/IMainStats";

interface SingleStatWithChartProps {
  data: projectsObject;
  title: string;
}

const SingleStatWithChart: React.FC<SingleStatWithChartProps> = ({
  data,
  title,
}) => {
  return <Box>number with chart</Box>;
};

export default SingleStatWithChart;
