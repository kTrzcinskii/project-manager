import { HStack, Button } from "@chakra-ui/react";

interface ChangeUsernameFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
}

const ChangeUsernameFooter: React.FC<ChangeUsernameFooterProps> = ({
  onClose,
  isSubmitting,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='teal'
        _focus={{ ring: 3, ringColor: "teal.800" }}
        type='submit'
        form='change-username-form'
        isLoading={isSubmitting}
        loadingText='Change Username'
      >
        Change Username
      </Button>
      <Button _focus={{ ring: 3, ringColor: "white" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default ChangeUsernameFooter;
