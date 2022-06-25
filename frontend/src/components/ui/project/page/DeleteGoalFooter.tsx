import { HStack, Button, color, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "react-query";
import useDeleteGoal from "../../../../hooks/mutation/useDeleteGoal";
import atLeastOneGoalToastOptions from "../../../../utils/toasts/atLeastOneGoalToastOptions";
import networkErrorToastOptions from "../../../../utils/toasts/networkErrorToastOptions";

interface DeleteGoalFooterProps {
  color?: string;
  onClose: () => void;
  isSubmitting: boolean;
  id: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  projectId: number;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const DeleteGoalFooter: React.FC<DeleteGoalFooterProps> = ({
  color = "teal",
  onClose,
  isSubmitting,
  id,
  setIsVisible,
  projectId,
  setIsSubmitting,
}) => {
  const mutation = useDeleteGoal(id);
  const queryClient = useQueryClient();

  const toast = useToast();
  const toastNetworError = networkErrorToastOptions();

  const handleDelete = () => {
    setIsSubmitting(true);
    mutation.mutate(null, {
      onSuccess: () => {
        setIsSubmitting(false);
        onClose();
        setIsVisible(false);
        setTimeout(() => {
          queryClient.invalidateQueries(["project", projectId]);
          queryClient.invalidateQueries(["projectStats", projectId]);
        }, 200);
      },
      onError: (error) => {
        setIsSubmitting(false);
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            toast(toastNetworError);
          } else {
            const message = error.response.data.message;
            const realMessage =
              typeof message === "string" ? message : message[0];
            const toastOneGoalError = atLeastOneGoalToastOptions(realMessage);
            toast(toastOneGoalError);
            onClose();
          }
        }
      },
    });
  };

  return (
    <HStack w='full' justifyContent='space-around'>
      <Button
        colorScheme={color}
        _focus={{ ring: 3, ringColor: `${color}.800` }}
        minW='134px'
        isLoading={isSubmitting}
        loadingText='Delete Goal'
        onClick={handleDelete}
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
