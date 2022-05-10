import { RefObject, Dispatch, SetStateAction } from "react";
import ChangePasswordForm from "../../../../sections/ChangePasswordForm";

interface ChangePasswordBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const ChangePasswordBody: React.FC<ChangePasswordBodyProps> = ({
  initialRef,
  setIsSubmitting,
  onClose,
}) => {
  return (
    <ChangePasswordForm
      initialRef={initialRef}
      setIsSubmitting={setIsSubmitting}
      onClose={onClose}
    />
  );
};

export default ChangePasswordBody;
