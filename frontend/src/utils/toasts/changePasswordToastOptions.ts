import { UseToastOptions } from "@chakra-ui/react";

const changePasswordToastOptions = (): UseToastOptions => {
  return {
    position: "top",
    title: "Password Changed!",
    description: "Your password has been successfully changed.",
    isClosable: true,
    status: "success",
  };
};

export default changePasswordToastOptions;
