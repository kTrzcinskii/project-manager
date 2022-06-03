import { Flex, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import CreateNewProjectBtn from "./CreateNewProjectBtn";
import FilterBtn from "./FilterBtn";
import SortByBtn from "./SortByBtn";

interface FilterBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
}

const FilterBar: React.FC<FilterBarProps> = ({
  query,
  setQuery,
  setIsSorting,
  setIsFiltering,
}) => {
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
        <FilterBtn
          query={query}
          setQuery={setQuery}
          setIsFiltering={setIsFiltering}
        />
        <SortByBtn setQuery={setQuery} setIsSorting={setIsSorting} />
      </HStack>
      <CreateNewProjectBtn />
    </Flex>
  );
};

export default FilterBar;
