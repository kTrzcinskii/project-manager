import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import DeleteAccountBody from "./modal-contents/delete-acount/DeleteAccountBody";
import DeleteAccountFooter from "./modal-contents/delete-acount/DeleteAccountFooter";
import ModalContainer from "../utils/ModalContainer";
import { motion } from "framer-motion";

const DeleteAccountBtn: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <Box
        py={{ base: 6, md: 10, lg: 16 }}
        as={motion.div}
        initial={{
          opacity: 0,
          translateY: "150%",
        }}
        animate={{
          opacity: 1,
          translateY: "0%",
          transition: {
            duration: 0.3,
            ease: "easeInOut",
            delay: 1.5,
          },
        }}
      >
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
        body={
          <DeleteAccountBody
            initialRef={initialRef}
            setIsSubmitting={setIsSubmitting}
          />
        }
        footer={
          <DeleteAccountFooter onClose={onClose} isSubmitting={isSubmitting} />
        }
        initialRef={initialRef}
      />
    </>
  );
};

export default DeleteAccountBtn;
