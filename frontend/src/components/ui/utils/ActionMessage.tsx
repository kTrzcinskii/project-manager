import { Text, Progress } from "@chakra-ui/react";

interface ActionMessageProps {
  message: string;
}

const ActionMessage: React.FC<ActionMessageProps> = ({ message }) => {
  return (
    <>
      <Text
        mb={4}
        textAlign='center'
        color='teal.900'
        fontWeight='semibold'
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
      >
        {message}
      </Text>
      <Progress
        isIndeterminate
        colorScheme='teal'
        w='300px'
        maxW='60%'
        size='sm'
      />
    </>
  );
};

export default ActionMessage;
