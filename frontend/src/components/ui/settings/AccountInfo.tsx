import { Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import IMe from "../../../interfaces/IMe";
import InfoHeader from "./InfoHeader";

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
      <Text fontSize={{ base: "xl", md: "2xl" }}>
        <InfoHeader>Username:</InfoHeader> {user.username}
      </Text>
      <Text fontSize={{ base: "xl", md: "2xl" }}>
        <InfoHeader>Email:</InfoHeader> {user.email}
      </Text>
      <Text fontSize={{ base: "xl", md: "2xl" }}>
        <InfoHeader>Joined:</InfoHeader> {createdDate}
      </Text>
      <Text fontSize={{ base: "xl", md: "2xl" }}>
        <InfoHeader>Password:</InfoHeader> {randomPassword}
      </Text>
    </VStack>
  );
};

export default AccountInfo;
