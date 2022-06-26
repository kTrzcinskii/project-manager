import { HStack, Button, color } from "@chakra-ui/react";

interface EditGoalFooterProps {
  color?: string;
  isSubmitting: boolean;
  onClose: () => void;
}

const EditGoalFooter: React.FC<EditGoalFooterProps> = ({
  color = "teal",
  isSubmitting,
  onClose,
}) => {
  return (
    <HStack w='full' justifyContent='space-around'>
      <Button
        colorScheme={color}
        _focus={{ ring: 3, ringColor: `${color}.800` }}
        minW='134px'
        isLoading={isSubmitting}
        loadingText='Delete Goal'
        type='submit'
        form='edit-goal-form'
      >
        Edit Goal
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default EditGoalFooter;
