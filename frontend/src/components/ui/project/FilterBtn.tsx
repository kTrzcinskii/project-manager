import { Button, HStack, Text } from "@chakra-ui/react";
import { BsFilterLeft } from "react-icons/bs";

const FilterBtn: React.FC = () => {
  return (
    <Button _focus={{ ring: 3, ringColor: "gray" }}>
      <HStack spacing={2}>
        <BsFilterLeft fontSize='26' /> <Text>Filter</Text>
      </HStack>
    </Button>
  );
};

export default FilterBtn;
