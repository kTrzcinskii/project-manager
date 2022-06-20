import { VStack } from "@chakra-ui/react";
import SingleDate from "./SingleDate";

interface DatesContainerProps {
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

const DatesContainer: React.FC<DatesContainerProps> = ({
  createdAt,
  updatedAt,
  completedAt,
}) => {
  return (
    <VStack w='full'>
      <SingleDate title='Created on' date={createdAt} />
      <SingleDate title='Updated on' date={updatedAt} />
      {completedAt && <SingleDate title='Completed on' date={completedAt} />}
    </VStack>
  );
};

export default DatesContainer;
