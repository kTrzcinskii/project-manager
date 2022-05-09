import { RefObject, Dispatch, SetStateAction } from "react";
import ChangeEmailForm from "../../../../sections/ChangeEmailForm";

interface ChangeEmailBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const ChangeEmailBody: React.FC<ChangeEmailBodyProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  return (
    <ChangeEmailForm
      initialRef={initialRef}
      setIsSubmitting={setIsSubmitting}
    />
  );
};

export default ChangeEmailBody;
