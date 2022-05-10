import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangeEmailBody from "./modal-contents/change-email/ChangeEmailBody";
import ChangeEmailFooter from "./modal-contents/change-email/ChangeEmailFooter";
import ModalContainer from "./ModalContainer";

interface EmailInfoProps {
  email: string;
}

const EmailInfo: React.FC<EmailInfoProps> = ({ email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer>
        <InfoField header='email' value={email} />
        <ChangeBtn onClick={onOpen} />
      </FieldContainer>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Change Email'
        body={
          <ChangeEmailBody
            initialRef={initialRef}
            setIsSubmitting={setIsSubmitting}
            onClose={onClose}
          />
        }
        footer={
          <ChangeEmailFooter isSubmitting={isSubmitting} onClose={onClose} />
        }
        initialRef={initialRef}
      />
    </>
  );
};

export default EmailInfo;
