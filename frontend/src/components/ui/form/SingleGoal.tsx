import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import ICreateGoalValues from "../../../interfaces/ICreateGoalValues";

interface SingleGoalProps {
  content: string;
  index: number;
  setGoals: Dispatch<SetStateAction<ICreateGoalValues[]>>;
  setEditingIndex: Dispatch<SetStateAction<number | null>>;
  editingIndex: number | null;
}

const SingleGoal: React.FC<SingleGoalProps> = ({
  content,
  index,
  setGoals,
  setEditingIndex,
  editingIndex,
}) => {
  const handleEdit = () => {
    setEditingIndex(index);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      if (index < editingIndex) {
        setEditingIndex((prevEditingIndex) => prevEditingIndex! - 1);
      }
    }
    setGoals((goals) =>
      goals.filter((_goal, goalIndex) => goalIndex !== index)
    );
  };

  return (
    <HStack
      w='full'
      px='3'
      py='1'
      rounded='lg'
      _hover={{ bgColor: "gray.200" }}
      justifyContent='space-between'
      bgColor='gray.100'
      minH='48px'
    >
      <HStack spacing={4} fontSize='md'>
        <Text color='teal.700' fontWeight='semibold'>
          {index + 1}
        </Text>
        <Text color='blue.800' fontWeight='medium'>
          {content}
        </Text>
      </HStack>
      <HStack>
        <IconButton
          aria-label='Edit Goal'
          variant='ghost'
          color='teal'
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          icon={<EditIcon />}
          onClick={handleEdit}
        />
        <IconButton
          aria-label='Delete Goal'
          variant='ghost'
          color='red'
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          icon={<DeleteIcon />}
          onClick={handleDelete}
        />
      </HStack>
    </HStack>
  );
};

export default SingleGoal;
