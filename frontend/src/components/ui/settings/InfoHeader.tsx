import { Text } from "@chakra-ui/react";
import { ReactText } from "react";

interface InfoHeaderProps {
  children: ReactText;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ children }) => {
  return (
    <Text
      fontSize='inherit'
      color='teal.600'
      display='inline'
      fontWeight='semibold'
    >
      {children}
    </Text>
  );
};

export default InfoHeader;
