import { HStack, Text, Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface FilterModalHeaderProps {
  showBtn: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsClearingFilters: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  propQuery: string;
}

const FilterModalHeader: React.FC<FilterModalHeaderProps> = ({
  showBtn,
  onClose,
  setIsClearingFilters,
  setQuery,
  propQuery,
}) => {
  return (
    <HStack w='90%' justifyContent='space-between'>
      <Text>Select Filters</Text>
      {showBtn && (
        <Button
          variant='link'
          colorScheme='red'
          onClick={() => {
            setIsClearingFilters(true);
            setQuery(propQuery);
            const timeout = setTimeout(() => setIsClearingFilters(false), 1500);
            onClose();
          }}
        >
          Clear Filters
        </Button>
      )}
    </HStack>
  );
};

export default FilterModalHeader;
