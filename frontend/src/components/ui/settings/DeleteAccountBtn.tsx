import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import DeleteAccountBody from "./modal-contents/delete-acount/DeleteAccountBody";
import DeleteAccountFooter from "./modal-contents/delete-acount/DeleteAccountFooter";
import ModalContainer from "./ModalContainer";

const DeleteAccountBtn: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Box py={{ base: 6, md: 10, lg: 16 }}>
        <Button
          mx='auto'
          colorScheme='red'
          _focus={{ ring: 3, ringColor: "red.800" }}
          onClick={onOpen}
        >
          Delete account
        </Button>
      </Box>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Delete Account'
        body={<DeleteAccountBody initialRef={initialRef} />}
        footer={<DeleteAccountFooter onClose={onClose} />}
        initialRef={initialRef}
      />
    </>
  );
};

export default DeleteAccountBtn;