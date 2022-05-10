import { RefObject, Dispatch, SetStateAction } from "react";
import ChangeUsernameForm from "../../../../sections/ChangeUsernameForm";

interface ChangeUsernameBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const ChangeUsernameBody: React.FC<ChangeUsernameBodyProps> = ({
  initialRef,
  setIsSubmitting,
  onClose,
}) => {
  return (
    <ChangeUsernameForm
      initialRef={initialRef}
      setIsSubmitting={setIsSubmitting}
      onClose={onClose}
    />
  );
};

export default ChangeUsernameBody;
