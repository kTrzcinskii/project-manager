import { UseToastOptions } from "@chakra-ui/react";

const atLeastOneGoalToastOptions = (message: string): UseToastOptions => {
  return {
    position: "top",
    title: "You cannot do that!",
    description: message,
    isClosable: true,
    status: "error",
  };
};

export default atLeastOneGoalToastOptions;
