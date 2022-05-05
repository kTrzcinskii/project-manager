import { Text } from "@chakra-ui/react";
import { RefObject } from "react";
import DeleteAccountForm from "../../../../sections/DeleteAccountForm";

interface DeleteAccountBodyProps {
  initialRef: RefObject<HTMLInputElement>;
}

const DeleteAccountBody: React.FC<DeleteAccountBodyProps> = ({
  initialRef,
}) => {
  return (
    <>
      <Text>
        You are about to delete your account. All of the content you have
        created will be removed. This action is irreversible. Are you sure you
        want to continue?
      </Text>
      <DeleteAccountForm />
    </>
  );
};

export default DeleteAccountBody;
