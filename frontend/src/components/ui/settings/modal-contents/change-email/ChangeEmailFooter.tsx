import { HStack, Button } from "@chakra-ui/react";

interface ChangeEmailFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
}

const ChangeEmailFooter: React.FC<ChangeEmailFooterProps> = ({
  onClose,
  isSubmitting,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='teal'
        _focus={{ ring: 3, ringColor: "teal.800" }}
        type='submit'
        form='change-email-form'
        isLoading={isSubmitting}
        loadingText='Change Email'
      >
        Change Email
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default ChangeEmailFooter;
