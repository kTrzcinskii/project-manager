import { HStack, Button, color } from "@chakra-ui/react";

interface DeleteGoalFooterProps {
  color?: string;
  onClose: () => void;
  isSubmitting: boolean;
}

const DeleteGoalFooter: React.FC<DeleteGoalFooterProps> = ({
  color = "teal",
  onClose,
  isSubmitting,
}) => {
  return (
    <HStack w='full' justifyContent='space-around'>
      <Button
        colorScheme={color}
        _focus={{ ring: 3, ringColor: `${color}.800` }}
        minW='134px'
        isLoading={isSubmitting}
        loadingText='Delete Goal'
      >
        Delete Goal
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default DeleteGoalFooter;
