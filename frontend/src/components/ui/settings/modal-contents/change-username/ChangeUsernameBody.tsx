import { RefObject, Dispatch, SetStateAction } from "react";
import ChangeUsernameForm from "../../../../sections/ChangeUsernameForm";

interface ChangeUsernameBodyProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const ChangeUsernameBody: React.FC<ChangeUsernameBodyProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  return (
    <ChangeUsernameForm
      initialRef={initialRef}
      setIsSubmitting={setIsSubmitting}
    />
  );
};

export default ChangeUsernameBody;
