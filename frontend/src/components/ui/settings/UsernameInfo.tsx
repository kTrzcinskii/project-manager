import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangeUsernameBody from "./modal-contents/change-username/ChangeUsernameBody";
import ChangeUsernameFooter from "./modal-contents/change-username/ChangeUsernameFooter";
import ModalContainer from "../utils/ModalContainer";

interface UsernameInfoProps {
  username: string;
}

const UsernameInfo: React.FC<UsernameInfoProps> = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer>
        <InfoField header='username' value={username} />
        <ChangeBtn onClick={onOpen} />
      </FieldContainer>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Change Username'
        body={
          <ChangeUsernameBody
            initialRef={initialRef}
            setIsSubmitting={setIsSubmitting}
            onClose={onClose}
          />
        }
        footer={
          <ChangeUsernameFooter isSubmitting={isSubmitting} onClose={onClose} />
        }
        initialRef={initialRef}
      />
    </>
  );
};

export default UsernameInfo;
