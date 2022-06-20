import { UseToastOptions } from "@chakra-ui/toast";

const deleteProjectToastOptions = (time: number): UseToastOptions => {
  return {
    position: "top",
    title: "Post delete!",
    description: "Your post has been successfully deleted.",
    isClosable: true,
    status: "success",
    duration: time,
  };
};

export default deleteProjectToastOptions;
