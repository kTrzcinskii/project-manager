import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import ModalContainer from "../utils/ModalContainer";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";
import ChangeUsernameBody from "./modal-contents/change-username/ChangeUsernameBody";
import ChangeUsernameFooter from "./modal-contents/change-username/ChangeUsernameFooter";

interface UsernameInfoProps {
  username: string;
}

const UsernameInfo: React.FC<UsernameInfoProps> = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <FieldContainer index={0}>
        <InfoField
          header='username'
          value={username}
          onOpen={onOpen}
          showEditBtn={true}
        />
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
