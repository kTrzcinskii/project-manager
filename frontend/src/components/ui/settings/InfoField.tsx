import { Box, Text, VStack } from "@chakra-ui/react";

interface InfoFieldProps {
  header: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ header, value }) => {
  return (
    <VStack w='full' alignItems='flex-start' mx='auto'>
      <Text
        textTransform='uppercase'
        color='teal.700'
        fontSize={{ base: "inherit", lg: "xl" }}
      >
        {header + ":"}
      </Text>
      <Box bgColor='white' borderRadius='md' px={3} py={1} w='full'>
        <Text fontWeight='medium' fontSize={{ base: "inherit", lg: "xl" }}>
          {value}
        </Text>
      </Box>
    </VStack>
  );
};

export default InfoField;
