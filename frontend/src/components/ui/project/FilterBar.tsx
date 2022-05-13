import { Box, Flex } from "@chakra-ui/react";
import CreateNewProjectBtn from "./CreateNewProjectBtn";
import FilterBtns from "./FilterBtns";

const FilterBar: React.FC = () => {
  return (
    <>
      <Flex
        mx='auto'
        justifyContent='space-between'
        mt={{ base: 5, md: 8 }}
        flexDir={{ base: "column-reverse", md: "column-reverse", lg: "row" }}
        px={5}
      >
        <Box mx={{ base: "auto", md: "auto", lg: "0" }}>
          <FilterBtns />
        </Box>
        <Box
          mx={{ base: "auto", md: "auto", lg: "0" }}
          mb={{ base: 5, md: 5, lg: 0 }}
        >
          <CreateNewProjectBtn />
        </Box>
      </Flex>
    </>
  );
};

export default FilterBar;
