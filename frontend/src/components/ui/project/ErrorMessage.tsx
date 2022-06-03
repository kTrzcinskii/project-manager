import { Heading, Text } from "@chakra-ui/react";

const ErrorMessage: React.FC = () => (
  <>
    <Heading
      textAlign='center'
      color='teal.900'
      fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
    >
      Server Error
    </Heading>
    <Text
      fontSize={{ base: "md", md: "lg", lg: "xl" }}
      textAlign='center'
      color='gray.800'
    >
      Sorry, we cannot reach our server right now. Please try again later.
    </Text>
  </>
);

export default ErrorMessage;
