import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CreateNewProjectBtn: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      colorScheme='teal'
      _focus={{ ring: 3, ringColor: "teal.700" }}
      onClick={() => router.push("/create-project")}
    >
      <HStack spacing={2}>
        <AddIcon fontSize='xs' /> <Text>New Project</Text>
      </HStack>
    </Button>
  );
};

export default CreateNewProjectBtn;
