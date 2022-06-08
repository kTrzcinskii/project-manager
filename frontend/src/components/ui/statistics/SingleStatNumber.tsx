import { Box, Text, VStack } from "@chakra-ui/react";

interface SingleStatNumberProps {
  data: number;
  title: string;
  color: string;
}

const SingleStatNumber: React.FC<SingleStatNumberProps> = ({
  data,
  title,
  color,
}) => {
  return (
    <VStack>
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
