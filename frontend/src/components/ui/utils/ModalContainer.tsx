import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ReactNode, RefObject } from "react";

interface ModalContainerProps {
  header: string | ReactNode;
  body: ReactNode;
  footer: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  initialRef?: RefObject<HTMLInputElement>;
  size?: { base: string; md: string; lg: string };
  isCentered?: boolean;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  header,
  body,
  footer,
  isOpen,
  onClose,
  initialRef,
  size,
  isCentered = true,
}) => {
  const mySize = size || { base: "xs", md: "md", lg: "lg" };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={isCentered}
      initialFocusRef={initialRef}
      size={useBreakpointValue(mySize)}
      scrollBehavior='outside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
