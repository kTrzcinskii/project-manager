import { HStack, Button } from "@chakra-ui/react";

interface ChangePasswordFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
}

const ChangePasswordFooter: React.FC<ChangePasswordFooterProps> = ({
  onClose,
  isSubmitting,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='teal'
        _focus={{ ring: 3, ringColor: "teal.800" }}
        type='submit'
        form='change-password-form'
        isLoading={isSubmitting}
        loadingText='Change Password'
      >
        Change Password
      </Button>
      <Button _focus={{ ring: 3, ringColor: "white" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default ChangePasswordFooter;
