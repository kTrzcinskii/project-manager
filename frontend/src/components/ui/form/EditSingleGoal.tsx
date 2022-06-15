import { CheckIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ICreateGoalValues from "../../../interfaces/ICreateGoalValues";

interface EditSingleGoalProps {
  defaultInput: string;
  setGoals: Dispatch<SetStateAction<ICreateGoalValues[]>>;
  index: number;
  setEditingIndex: Dispatch<SetStateAction<number | null>>;
  isEditingError: boolean;
  setIsEditingError: Dispatch<SetStateAction<boolean>>;
}

const EditSingleGoal: React.FC<EditSingleGoalProps> = ({
  defaultInput,
  setGoals,
  index,
  setEditingIndex,
  isEditingError,
  setIsEditingError,
}) => {
  const [inputValue, setInputValue] = useState(defaultInput);
  const [isError, setIsError] = useState(false);
  const ERROR_MESSAGE = "Goal content is required";
  const EDITING_ERROR_MESSAGE = "Finish editing your goal";

  useEffect(() => {
    if (isEditingError) {
      const timeout = setTimeout(() => setIsEditingError(false), 2000);

      return () => clearTimeout(timeout);
    }
  }, [isEditingError, setIsEditingError]);

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => setIsError(false), 2000);

      return () => clearTimeout(timeout);
    }
  }, [isError, setIsError]);

  const handleClick = () => {
    if (inputValue === "" || inputValue.trim() === "") {
      setIsError(true);
      return;
    }
    setGoals((goals) =>
      goals.map((goal, goalIndex) => {
        if (goalIndex === index) {
          return { content: inputValue };
        }
        return goal;
      })
    );
    setEditingIndex(null);
  };

  return (
    <VStack w='full'>
      <InputGroup>
        <Input
          name='edit-goal'
          placeholder='Edit your goal'
          id='edit-goal'
          variant='filled'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          _focus={{ borderColor: "teal.500", borderWidth: 2 }}
          borderColor={isEditingError || isError ? "red.500" : "gray.100"}
          _hover={{
            borderColor: isEditingError || isError ? "red.500" : "gray.200",
            bgColor: "gray.200",
          }}
          rounded='lg'
        />
        <InputRightElement>
          <IconButton
            aria-label='Add goal'
            icon={<CheckIcon />}
            colorScheme='teal'
            _focus={{ ring: 3, ringColor: "teal.800" }}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      {isError && (
        <Text w='full' color='red.500' fontSize='sm'>
          {ERROR_MESSAGE}
        </Text>
      )}
      {isEditingError && (
        <Text w='full' color='red.500' fontSize='sm'>
          {EDITING_ERROR_MESSAGE}
        </Text>
      )}
    </VStack>
  );
};

export default EditSingleGoal;
