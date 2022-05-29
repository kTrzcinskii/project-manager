import { UseToastOptions } from "@chakra-ui/toast";

const successfulPostEditedToastOptions = (): UseToastOptions => {
  return {
    position: "top",
    title: "Post updated!",
    description: "Your post has been successfully updated.",
    isClosable: true,
    status: "success",
    duration: 3000,
  };
};

export default successfulPostEditedToastOptions;
