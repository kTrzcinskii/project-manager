import { Text, chakra } from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction } from "react";
import DeleteAccountForm from "../../../../sections/DeleteAccountForm";

interface DeleteAccountBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountBody: React.FC<DeleteAccountBodyProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  return (
    <>
      <Text>
        You are about to delete your account. All of the content you have
        created will be removed. This action is{" "}
        <chakra.span fontWeight='bold'>irreversible</chakra.span>. Are you sure
        you want to continue?
      </Text>
      <DeleteAccountForm
        initialRef={initialRef}
        setIsSubmitting={setIsSubmitting}
      />
    </>
  );
};

export default DeleteAccountBody;
