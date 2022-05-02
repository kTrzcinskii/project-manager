import { Text, VStack } from "@chakra-ui/react";
import IMe from "../../../interfaces/IMe";
import InfoHeader from "./InfoHeader";
import InfoTextContainer from "./InfoTextContainer";

interface AccountInfoProps {
  user: IMe;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  let randomPassword = "";
  for (let i = 0; i < Math.floor(Math.random() * 11) + 6; i++) {
    randomPassword += "*";
  }

  const createdDate = new Date(user.createdAt).toLocaleString();

  return (
    <VStack
      w='80%'
      alignItems='flex-start'
      mx='auto'
      spacing={{ base: 4, md: 8 }}
    >
      <InfoTextContainer>
        <InfoHeader>Username:</InfoHeader> {user.username}
      </InfoTextContainer>
      <InfoTextContainer>
        <InfoHeader>Email:</InfoHeader> {user.email}
      </InfoTextContainer>
      <InfoTextContainer>
        <InfoHeader>Joined:</InfoHeader> {createdDate}
      </InfoTextContainer>
      <InfoTextContainer>
        <InfoHeader>Password:</InfoHeader> {randomPassword}
      </InfoTextContainer>
    </VStack>
  );
};

export default AccountInfo;
