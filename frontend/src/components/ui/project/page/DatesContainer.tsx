import { VStack } from "@chakra-ui/react";
import SingleDate from "./SingleDate";

interface DatesContainerProps {
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  color?: string;
}

const DatesContainer: React.FC<DatesContainerProps> = ({
  createdAt,
  updatedAt,
  completedAt,
  color,
}) => {
  return (
    <VStack w='full'>
      <SingleDate title='Created on' date={createdAt} color={color} />
      <SingleDate title='Updated on' date={updatedAt} color={color} />
      {completedAt && (
        <SingleDate title='Completed on' date={completedAt} color={color} />
      )}
    </VStack>
  );
};

export default DatesContainer;
