import { Container, useBreakpointValue } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: FC<FormContainerProps> = ({ children }) => {
  return (
    <Container
      maxW={useBreakpointValue({ base: "xs", md: "md" })}
      bgColor='white'
      py={useBreakpointValue({
        base: 8,
        md: 12,
        lg: 16,
      })}
      px={useBreakpointValue({
        base: 6,
        md: 8,
        lg: 12,
      })}
    >
      {children}
    </Container>
  );
};

export default FormContainer;
