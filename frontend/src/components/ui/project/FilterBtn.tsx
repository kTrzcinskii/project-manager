import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { BsFilterLeft } from "react-icons/bs";
import FilterForm from "../../sections/FilterForm";
import ModalContainer from "../utils/ModalContainer";
import FilterFooter from "./FilterFooter";

const FilterBtn: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onOpen}>
        <HStack spacing={2}>
          <BsFilterLeft fontSize='26' /> <Text>Filter</Text>
        </HStack>
      </Button>
      <ModalContainer
        isOpen={isOpen}
        header='Select Filters'
        body={<FilterForm initialRef={initialRef} />}
        footer={<FilterFooter onClose={onClose} />}
        onClose={onClose}
        initialRef={initialRef}
        size={{ base: "xs", md: "md", lg: "md" }}
      />
    </>
  );
};

export default FilterBtn;
