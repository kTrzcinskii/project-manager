import { HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FieldContainerProps {
  children: ReactNode;
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children }) => {
  return (
    <HStack w='full' pos='relative'>
      {children}
    </HStack>
  );
};

export default FieldContainer;
