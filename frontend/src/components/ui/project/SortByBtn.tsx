import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { BsSortAlphaDown } from "react-icons/bs";
import ModalContainer from "../utils/ModalContainer";
import SortByBody from "./sort-by-modal-content/SortByBody";
import SortByFooter from "./sort-by-modal-content/SortByFooter";

const SortByBtn: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onOpen}>
        <HStack spacing={2}>
          <BsSortAlphaDown fontSize='22' /> <Text>Sort By</Text>
        </HStack>
      </Button>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Sort By'
        body={<SortByBody onClose={onClose} />}
        footer={<SortByFooter />}
        size={{ base: "xs", md: "xs", lg: "xs" }}
      />
    </>
  );
};

export default SortByBtn;
