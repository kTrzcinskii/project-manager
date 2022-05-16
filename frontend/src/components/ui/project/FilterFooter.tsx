import { HStack, Button } from "@chakra-ui/react";

interface FilterFooterProps {
  onClose: () => void;
}

const FilterFooter: React.FC<FilterFooterProps> = ({ onClose }) => {
  return (
    <HStack justifyContent='space-around' w='full'>
      <Button
        colorScheme='teal'
        _focus={{ ring: 3, ringColor: "teal.800" }}
        type='submit'
        form='filter-form'
      >
        Apply Filters
      </Button>
      <Button _focus={{ ring: 3, ringColor: "gray" }} onClick={onClose}>
        Cancel
      </Button>
    </HStack>
  );
};

export default FilterFooter;
