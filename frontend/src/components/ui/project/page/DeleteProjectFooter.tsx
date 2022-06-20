import { Button, HStack } from "@chakra-ui/react";

interface DeleteProjectFooterProps {
  onClick: () => void;
  onClose: () => void;
}

const DeleteProjectFooter: React.FC<DeleteProjectFooterProps> = ({
  onClick,
  onClose,
}) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='red'
        _focus={{ ring: 3, ringColor: "red.800" }}
        onClick={onClick}
      >
        Delete Project
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default DeleteProjectFooter;
