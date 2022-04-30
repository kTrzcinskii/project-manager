import { VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface GradientBgProps {
  children: ReactNode;
}

const GradientBg: FC<GradientBgProps> = ({ children }) => {
  return (
    <VStack
      alignItems='center'
      justifyContent='center'
      minH='100vh'
      bgGradient={"linear(to-r, teal.200, teal.400)"}
    >
      {children}
    </VStack>
  );
};

export default GradientBg;
