import { Button, HStack } from "@chakra-ui/react";
import CreateNewProjectBtn from "./CreateNewProjectBtn";
import FilterBtns from "./FilterBtns";

const FilterBar: React.FC = () => {
  return (
    <HStack
      w='85%'
      mx='auto'
      justifyContent='space-between'
      mt={{ base: 5, md: 8 }}
    >
      <FilterBtns />
      <CreateNewProjectBtn />
    </HStack>
  );
};

export default FilterBar;
