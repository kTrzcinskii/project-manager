import { UseToastOptions } from "@chakra-ui/react";

const networkErrorToastOptions = (): UseToastOptions => {
  return {
    position: "top",
    title: "Server Error",
    description: "We can't reach the server, please try again later.",
    isClosable: true,
    status: "error",
  };
};

export default networkErrorToastOptions;
