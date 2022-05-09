import { UseToastOptions } from "@chakra-ui/toast";

const updateProfileToastOptions = (
  field: string,
  time: number
): UseToastOptions => {
  const fieldTitle = field[0].toUpperCase() + field.slice(1);

  return {
    position: "top",
    title: `${fieldTitle} Changed!`,
    description: `Your ${field} has been successfully changed. This page will be reloaded to update profile informations.`,
    duration: time * 2,
    isClosable: false,
    status: "success",
  };
};

export default updateProfileToastOptions;
