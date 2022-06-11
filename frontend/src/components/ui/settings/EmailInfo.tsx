import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ModalContainer from "../utils/ModalContainer";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangeEmailBody from "./modal-contents/change-email/ChangeEmailBody";
import ChangeEmailFooter from "./modal-contents/change-email/ChangeEmailFooter";

interface EmailInfoProps {
  email: string;
}

const EmailInfo: React.FC<EmailInfoProps> = ({ email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer index={1}>
        <InfoField
          header='email'
          value={email}
          showEditBtn={true}
          onOpen={onOpen}
        />
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
