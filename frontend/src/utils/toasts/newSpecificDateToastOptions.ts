import { UseToastOptions } from "@chakra-ui/toast";

const newSpecificDateToastOptions = (date: string): UseToastOptions => {
  return {
    position: "top",
    title: "Date changed!",
    description: `You have successfully changed date to ${date}`,
    isClosable: true,
    status: "success",
    duration: 2000,
  };
};

export default newSpecificDateToastOptions;
