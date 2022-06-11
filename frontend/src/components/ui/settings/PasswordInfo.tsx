import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ModalContainer from "../utils/ModalContainer";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangePasswordBody from "./modal-contents/change-password/ChangePasswordBody";
import ChangePasswordFooter from "./modal-contents/change-password/ChangePasswordFooter";

const PasswordInfo: React.FC = () => {
  const randomPassword = "**************";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer index={3}>
        <InfoField
          header='password'
          value={randomPassword}
          showEditBtn={true}
          onOpen={onOpen}
        />
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
