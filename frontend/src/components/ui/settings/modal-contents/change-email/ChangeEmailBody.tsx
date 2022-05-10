import { RefObject, Dispatch, SetStateAction } from "react";
import ChangeEmailForm from "../../../../sections/ChangeEmailForm";

interface ChangeEmailBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const ChangeEmailBody: React.FC<ChangeEmailBodyProps> = ({
  initialRef,
  setIsSubmitting,
  onClose,
}) => {
  return (
    <ChangeEmailForm
      onClose={onClose}
      initialRef={initialRef}
      setIsSubmitting={setIsSubmitting}
    />
  );
};

export default ChangeEmailBody;
