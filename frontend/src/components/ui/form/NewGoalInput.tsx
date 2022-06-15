import { CheckIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ICreateGoalValues from "../../../interfaces/ICreateGoalValues";

interface NewGoalInputProps {
  setGoals: Dispatch<SetStateAction<ICreateGoalValues[]>>;
  setIsAddingGoal: Dispatch<SetStateAction<boolean>>;
}

const NewGoalInput: React.FC<NewGoalInputProps> = ({
  setGoals,
  setIsAddingGoal,
}) => {
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ERROR_MESSAGE = "Goal content is required";

  useEffect(() => {
    if (isError) {
      const timeout = setTimeout(() => setIsError(false), 2000);

      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const handleClick = () => {
    if (inputValue === "" || inputValue.trim() === "") {
      setIsError(true);
      return;
    }
    setGoals((previousGoals) => {
      return [...previousGoals, { content: inputValue }];
    });
    setIsAddingGoal(false);
  };

  return (
    <VStack w='full' pt={4}>
      <InputGroup>
        <Input
          name='new-goal'
          placeholder='Enter goal content'
          id='new-goal'
          variant='filled'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          _focus={{ borderColor: "teal.500", borderWidth: 2 }}
          borderColor={isError ? "red.500" : "gray.100"}
          _hover={{
            borderColor: isError ? "red.500" : "gray.200",
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
    </VStack>
  );
};

export default NewGoalInput;
