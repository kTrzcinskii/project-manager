import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";

const CreateNewProjectBtn: React.FC = () => {
  return (
    <Button colorScheme='teal' _focus={{ ring: 3, ringColor: "teal.700" }}>
      <HStack spacing={2}>
        <AddIcon fontSize='xs' /> <Text>New Project</Text>
      </HStack>
    </Button>
  );
};

export default CreateNewProjectBtn;
