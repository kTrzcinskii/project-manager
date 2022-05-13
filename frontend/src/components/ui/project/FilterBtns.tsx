import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";

const FilterBtns: React.FC = () => {
  return (
    <HStack spacing={{ base: 2, md: 5 }}>
      <Button _focus={{ ring: 3, ringColor: "gray" }}>Filter</Button>
      <IconButton
        _focus={{ ring: 3, ringColor: "gray" }}
        aria-label='Filter projects'
        icon={<SearchIcon />}
      />
    </HStack>
  );
};

export default FilterBtns;
