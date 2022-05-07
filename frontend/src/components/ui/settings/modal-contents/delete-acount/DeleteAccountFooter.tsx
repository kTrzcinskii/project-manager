import { Button, HStack } from "@chakra-ui/react";

interface DeleteAccountFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
}

const DeleteAccountFooter: React.FC<DeleteAccountFooterProps> = ({
  onClose,
  isSubmitting,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='red'
        _focus={{ ring: 3, ringColor: "red.800" }}
        type='submit'
        form='delete-account-form'
        isLoading={isSubmitting}
        loadingText='Delete Account'
      >
        Delete Account
      </Button>
      <Button _focus={{ ring: 3, ringColor: "white" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default DeleteAccountFooter;
