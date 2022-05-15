import { Flex, HStack } from "@chakra-ui/react";
import CreateNewProjectBtn from "./CreateNewProjectBtn";
import FilterBtn from "./FilterBtn";
import SortByBtn from "./SortByBtn";

const FilterBar: React.FC = () => {
  return (
    <Flex
      mx='auto'
      justifyContent='space-between'
      alignItems='center'
      mt={{ base: 5, md: 8 }}
      flexDir={{ base: "column", md: "column", lg: "row" }}
      px={5}
    >
      <HStack spacing={{ base: 2, md: 5 }} mb={{ base: 5, md: 5, lg: 0 }}>
        <FilterBtn />
        <SortByBtn />
      </HStack>
      <CreateNewProjectBtn />
    </Flex>
  );
};

export default FilterBar;
