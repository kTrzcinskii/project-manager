import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangePasswordBody from "./modal-contents/change-password/ChangePasswordBody";
import ChangePasswordFooter from "./modal-contents/change-password/ChangePasswordFooter";
import ModalContainer from "./ModalContainer";

const PasswordInfo: React.FC = () => {
  const randomPassword = "**************";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer>
        <InfoField header='password' value={randomPassword} />
        <ChangeBtn onClick={onOpen} />
      </FieldContainer>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Change Password'
        body={
          <ChangePasswordBody
            initialRef={initialRef}
            setIsSubmitting={setIsSubmitting}
            onClose={onClose}
          />
        }
        footer={
          <ChangePasswordFooter isSubmitting={isSubmitting} onClose={onClose} />
        }
        initialRef={initialRef}
      />
    </>
  );
};

export default PasswordInfo;
