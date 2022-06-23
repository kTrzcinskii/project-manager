import { HStack, Button } from "@chakra-ui/react";

interface CreateGoalFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
  color?: string;
}

const CreateGoalFooter: React.FC<CreateGoalFooterProps> = ({
  onClose,
  isSubmitting,
  color = "teal",
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme={color}
        _focus={{ ring: 3, ringColor: `${color}.800` }}
        type='submit'
        form='create-goal-form'
        isLoading={isSubmitting}
        loadingText='Create Goal'
      >
        Create Goal
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default CreateGoalFooter;
