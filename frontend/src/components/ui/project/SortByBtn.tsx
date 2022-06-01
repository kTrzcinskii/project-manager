import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { BsSortAlphaDown } from "react-icons/bs";
import ModalContainer from "../utils/ModalContainer";
import SortByBody from "./SortByBody";

interface SortByBtnProps {
  setQuery: Dispatch<SetStateAction<string>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
}

const SortByBtn: React.FC<SortByBtnProps> = ({ setQuery, setIsSorting }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const srtRegexp = new RegExp("&srt=\\w+_(asc|desc)", "igm");

  const handleClick = (sortBy: string) => {
    setIsSorting(true);
    setQuery((currentQuery) => {
      if (currentQuery.includes("&srt")) {
        return currentQuery.replace(
          currentQuery.match(srtRegexp)![0],
          `&srt=${sortBy}`
        );
      }
      return (currentQuery += `&srt=${sortBy}`);
    });
    const timeout = setTimeout(() => setIsSorting(false), 1500);
    return () => clearTimeout(timeout);
  };

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
        body={<SortByBody onClose={onClose} handleClick={handleClick} />}
        footer={<></>}
        size={{ base: "xs", md: "xs", lg: "xs" }}
      />
    </>
  );
};

export default SortByBtn;
