import { UseToastOptions } from "@chakra-ui/toast";

const deleteProjectToastOptions = (time: number): UseToastOptions => {
  return {
    position: "top",
    title: "Project delete!",
    description: "Your project has been successfully deleted.",
    isClosable: true,
    status: "success",
    duration: time,
  };
};

export default deleteProjectToastOptions;
