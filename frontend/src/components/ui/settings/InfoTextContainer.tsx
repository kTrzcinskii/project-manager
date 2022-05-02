import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InfoTextContainerProps {
  children: ReactNode;
}

const InfoTextContainer: React.FC<InfoTextContainerProps> = ({ children }) => {
  return <Text fontSize={{ base: "xl", md: "2xl" }}>{children}</Text>;
};

export default InfoTextContainer;
