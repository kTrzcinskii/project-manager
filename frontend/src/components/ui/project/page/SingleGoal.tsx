import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import IGoal from "../../../../interfaces/IGoal";
import { BsCircle, BsCircleFill } from "react-icons/bs";

interface SingleGoalProps {
  goal: IGoal;
  index: number;
  color?: string;
}

const SingleGoal: React.FC<SingleGoalProps> = ({
  goal,
  index,
  color = "teal",
}) => {
  const btnColor = color === "pink" ? "pink.800" : color;

  return (
    <HStack
      w='full'
      justifyContent='space-between'
      px='3'
      py='1'
      bgColor={`${color}.50`}
      _hover={{ bgColor: `${color}.100` }}
      transition='ease-in-out'
      transitionDuration='200ms'
      rounded='lg'
    >
      <HStack spacing={4} fontSize='md'>
        <Text color={`${color}.700`} fontWeight='semibold'>
          {index + 1}
        </Text>
        <Text
          color={`${color}.700`}
          fontWeight='medium'
          textDecoration={goal.completed ? "line-through" : "null"}
          fontStyle={goal.completed ? "italic" : "inherit"}
        >
          {goal.content}
        </Text>
      </HStack>
      <HStack spacing={3}>
        <IconButton
          aria-label='Mark Goal as completed/ucompleted'
          variant='ghost'
          color={btnColor}
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          icon={goal.completed ? <BsCircleFill /> : <BsCircle />}
        />
        <IconButton
          aria-label='Edit Goal'
          variant='ghost'
          color={btnColor}
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          icon={<EditIcon />}
        />
        <IconButton
          aria-label='Delete Goal'
          variant='ghost'
          color='red'
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          icon={<DeleteIcon />}
        />
      </HStack>
    </HStack>
  );
};

export default SingleGoal;
