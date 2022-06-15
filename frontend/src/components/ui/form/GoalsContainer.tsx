import {
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useField } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ICreateGoalValues from "../../../interfaces/ICreateGoalValues";
import EditSingleGoal from "./EditSingleGoal";
import NewGoalInput from "./NewGoalInput";
import SingleGoal from "./SingleGoal";

interface GoalsContainerProps {
  setFieldValue: (field: string, value?: ICreateGoalValues[]) => void;
  name: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditingError: boolean;
  setIsEditingError: Dispatch<SetStateAction<boolean>>;
}

const GoalsContainer: React.FC<GoalsContainerProps> = ({
  setFieldValue,
  setIsEditing,
  isEditingError,
  setIsEditingError,
  ...props
}) => {
  const [goals, setGoals] = useState<ICreateGoalValues[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(true);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  useEffect(() => {
    flushSync(() => setFieldValue("goals", goals));
    if (goals.length === 0) {
      setIsAddingGoal(true);
    }
  }, [goals, setFieldValue]);

  useEffect(() => {
    if (editingIndex === null) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [editingIndex, setIsEditing]);

  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <VStack w='full' {...props} {...field}>
        {goals.map((goal, index) => {
          if (editingIndex === index) {
            return (
              <EditSingleGoal
                defaultInput={goal.content}
                setGoals={setGoals}
                index={index}
                setEditingIndex={setEditingIndex}
                isEditingError={isEditingError}
                setIsEditingError={setIsEditingError}
              />
            );
          }
          return (
            <SingleGoal
              content={goal.content}
              key={index}
              index={index}
              setGoals={setGoals}
              setEditingIndex={setEditingIndex}
              editingIndex={editingIndex}
            />
          );
        })}
        {isAddingGoal ? (
          <NewGoalInput setGoals={setGoals} setIsAddingGoal={setIsAddingGoal} />
        ) : (
          editingIndex === null && (
            <Box pt={4}>
              <Button
                colorScheme='teal'
                _focus={{ ring: 3, ringColor: "teal.800" }}
                onClick={() => setIsAddingGoal(true)}
              >
                Add Goal
              </Button>
            </Box>
          )
        )}
      </VStack>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default GoalsContainer;
