import { HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FieldContainerProps {
  children: ReactNode;
  index: number;
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children, index }) => {
  return (
    <HStack
      w='full'
      pos='relative'
      as={motion.div}
      variants={{
        hidden: {
          opacity: 0,
          translateX: "100%",
        },
        visible: (index: number) => ({
          transition: {
            delay: index * 0.3 + 0.3,
          },
          translateX: "0%",
          opacity: 1,
        }),
      }}
      initial='hidden'
      animate='visible'
      custom={index}
    >
      {children}
    </HStack>
  );
};

export default FieldContainer;
