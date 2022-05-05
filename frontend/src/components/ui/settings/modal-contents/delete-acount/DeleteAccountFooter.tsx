import { Button, HStack } from "@chakra-ui/react";

interface DeleteAccountFooterProps {
  onClose: () => void;
}

const DeleteAccountFooter: React.FC<DeleteAccountFooterProps> = ({
  onClose,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button colorScheme='red' _focus={{ ring: 3, ringColor: "red.800" }}>
        Delete Account
      </Button>
      <Button _focus={{ ring: 3, ringColor: "white" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default DeleteAccountFooter;
