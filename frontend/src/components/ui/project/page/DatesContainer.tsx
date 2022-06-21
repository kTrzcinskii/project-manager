import { VStack } from "@chakra-ui/react";
import SingleDate from "./SingleDate";

interface DatesContainerProps {
  createdAt: string;
  updatedAt: string;
  deadline: string;
  completedAt: string | null;
  color?: string;
}

const DatesContainer: React.FC<DatesContainerProps> = ({
  createdAt,
  updatedAt,
  completedAt,
  deadline,
  color,
}) => {
  return (
    <VStack w='full'>
      <SingleDate title='Created on' date={createdAt} color={color} />
      <SingleDate title='Updated on' date={updatedAt} color={color} />
      {completedAt ? (
        <SingleDate title='Completed on' date={completedAt} color={color} />
      ) : (
        <SingleDate
          title='Deadline'
          date={deadline}
          color={color}
          showDeadlineFormat={true}
        />
      )}
    </VStack>
  );
};

export default DatesContainer;
