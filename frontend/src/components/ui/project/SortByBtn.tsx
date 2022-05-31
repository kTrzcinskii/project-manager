import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { BsSortAlphaDown } from "react-icons/bs";
import ModalContainer from "../utils/ModalContainer";
import SortByBody from "./SortByBody";

const SortByBtn: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button _focus={{ ring: 3, ringColor: "teal.700" }} onClick={onOpen}>
        <HStack spacing={2}>
          <BsSortAlphaDown fontSize='22' color='#285E61' />{" "}
          <Text color='teal.700'>Sort By</Text>
        </HStack>
      </Button>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Sort By'
        body={<SortByBody onClose={onClose} />}
        footer={<></>}
        size={{ base: "xs", md: "xs", lg: "xs" }}
      />
    </>
  );
};

export default SortByBtn;
