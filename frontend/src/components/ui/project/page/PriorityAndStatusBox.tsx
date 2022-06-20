import { Text, chakra, Stack } from "@chakra-ui/react";
import { priority, status } from "../../../../interfaces/IProject";

interface PriorityAndStatusBoxProps {
  priority?: priority;
  status?: status;
  priorityColor: string;
  color?: string;
}

const PriorityAndStatusBox: React.FC<PriorityAndStatusBoxProps> = ({
  priority,
  status,
  priorityColor,
  color,
}) => {
  const realColor = color ? color : "teal";
  const realStatus = status === "inProgress" ? "In Progress" : status;

  return (
    <Stack
      alignItems={{ base: "center", md: "center", lg: "flex-end" }}
      justifyContent={{
        base: "space-between",
        md: "space-between",
        lg: "center",
      }}
      direction={{ base: "row", md: "row", lg: "column" }}
      fontSize={{ base: "lg", md: "xl" }}
    >
      <Text>
        Priority:{" "}
        <chakra.span textTransform='uppercase' color={`${priorityColor}.500`}>
          {priority}
        </chakra.span>
      </Text>
      <Text minW='162px' textAlign='right'>
        Status:{" "}
        <chakra.span textTransform='capitalize' color={`${realColor}.600`}>
          {realStatus}
        </chakra.span>
      </Text>
    </Stack>
  );
};

export default PriorityAndStatusBox;
