import { Container, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
      as={motion.div}
      initial={{
        opacity: 0,
        translateY: "-120%",
      }}
      animate={{
        opacity: 1,
        translateY: "0%",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </Container>
  );
};

export default FormContainer;
