import { Box, HStack, Text } from "@chakra-ui/react";
import { priority } from "../../../interfaces/IProject";

interface LegendElementProps {
  priority: priority;
  color: string;
  fontColor: string;
}

const LegendElement: React.FC<LegendElementProps> = ({
  priority,
  color,
  fontColor,
}) => {
  return (
    <HStack justifyContent='space-between' minW='125px'>
      <Box h={8} w={8} bgColor={color} />
      <Text textTransform='capitalize' color={fontColor}>
        {priority}
      </Text>
    </HStack>
  );
};

export default LegendElement;
