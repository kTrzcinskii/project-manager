import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface SingleStatNumberProps {
  data: number;
  title: string;
  color: string;
  initialDelay: number;
  index: number;
}

const SingleStatNumber: React.FC<SingleStatNumberProps> = ({
  data,
  title,
  color,
  initialDelay,
  index,
}) => {
  return (
    <VStack
      as={motion.div}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.2,
            delay: initialDelay + 0.1 + index * 0.2,
          },
        },
      }}
      initial='hidden'
      animate='visible'
    >
      <Text fontWeight='semibold' color={`${color}.800`} fontSize='3xl'>
        {data}
      </Text>
      <Text fontSize='xl' color={`${color}.600`}>
        {title}
      </Text>
    </VStack>
  );
};

export default SingleStatNumber;
