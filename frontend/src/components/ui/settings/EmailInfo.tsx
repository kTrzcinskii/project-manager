import { Box, Button, Flex } from "@chakra-ui/react";
import ChangeBtn from "./ChangeBtn";
import FieldContainer from "./FieldContainer";
import InfoField from "./InfoField";

interface EmailInfoProps {
  email: string;
}

const EmailInfo: React.FC<EmailInfoProps> = ({ email }) => {
  return (
    <FieldContainer>
      <InfoField header='email' value={email} />
      <ChangeBtn
        onClick={() => {
          console.log("chanign email");
        }}
      />
    </FieldContainer>
  );
};

export default EmailInfo;
