import { Button, HStack, Text } from "@chakra-ui/react";
import { BsSortAlphaDown } from "react-icons/bs";

const SortByBtn: React.FC = () => {
        return (
          <Button _focus={{ ring: 3, ringColor: "gray" }}>
            <HStack spacing={2}>
              <BsSortAlphaDown fontSize='22' /> <Text>Sort By</Text>
            </HStack>
          </Button>
        );
}

export default SortByBtn