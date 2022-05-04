import { VStack } from "@chakra-ui/react";
import IMe from "../../../interfaces/IMe";
import CreatedAtInfo from "./CreatedAtInfo";
import EmailInfo from "./EmailInfo";
import PasswordInfo from "./PasswordInfo";
import UsernameInfo from "./UsernameInfo";

interface AccountDetailsProps {
  user: IMe;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user }) => {
  return (
    <VStack
      w={{ base: "80%", md: "70%", lg: "50%" }}
      alignItems='flex-start'
      mx='auto'
      spacing={{ base: 4, md: 8 }}
    >
      <UsernameInfo username={user.username} />
      <EmailInfo email={user.email} />
      <CreatedAtInfo createdAt={user.createdAt} />
      <PasswordInfo />
    </VStack>
  );
};

export default AccountDetails;
