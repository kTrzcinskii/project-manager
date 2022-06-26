import { Button, HStack, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import useDeleteProject from "../../../../hooks/mutation/useDeleteProject";
import deleteProjectToastOptions from "../../../../utils/toasts/deleteProjectToastOptions";
import networkErrorToastOptions from "../../../../utils/toasts/networkErrorToastOptions";
import ModalContainer from "../../utils/ModalContainer";
import DeleteProjectBody from "./DeleteProjectBody";
import DeleteProjectFooter from "./DeleteProjectFooter";

interface BtnContainerProps {
  id: number;
  title?: string;
  color?: string;
}

const BtnContainer: React.FC<BtnContainerProps> = ({
  id,
  title,
  color = "teal",
}) => {
  const router = useRouter();
  const handleEdit = () => router.push(`/edit-project/${id}`);

  const toast = useToast();
  const errorToastOptions = networkErrorToastOptions();
  const time = 2000;
  const deleteProjecToastOptions = deleteProjectToastOptions(time);
  const mutation = useDeleteProject(id);

  const handleDelete = () => {
    mutation.mutate(null, {
      onSuccess: () => {
        toast(deleteProjecToastOptions);
        setTimeout(() => router.push("/home"), time);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            toast(errorToastOptions);
          }
        }
        onClose();
      },
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack spacing={4} py={6}>
        <Button
          colorScheme={color}
          _focus={{ ring: 3, ringColor: `${color}.800` }}
          minW='134px'
          onClick={handleEdit}
        >
          Edit Project
        </Button>
        <Button
          colorScheme='red'
          _focus={{ ring: 3, ringColor: "red.800" }}
          minW='134px'
          onClick={onOpen}
        >
          Delete Project
        </Button>
      </HStack>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Delete Project'
        body={<DeleteProjectBody title={title} />}
        footer={
          <DeleteProjectFooter onClick={handleDelete} onClose={onClose} />
        }
      />
    </>
  );
};

export default BtnContainer;
