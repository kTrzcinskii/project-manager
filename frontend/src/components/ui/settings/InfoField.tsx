import { EditIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";

interface InfoFieldProps {
  header: string;
  value: string;
  onOpen?: () => void;
  showEditBtn?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({
  header,
  value,
  onOpen,
  showEditBtn,
}) => {
  return (
    <VStack w='full' alignItems='flex-start' mx='auto'>
      <HStack w='full' justifyContent='space-between'>
        <Text
          textTransform='uppercase'
          color='teal.700'
          fontSize={{ base: "inherit", lg: "xl" }}
        >
          {header}
        </Text>
        {showEditBtn && (
          <IconButton
            aria-label='edit this field'
            icon={<EditIcon boxSize={{ base: 4, md: 4, lg: 5 }} />}
            onClick={onOpen}
            color='teal.700'
            _focus={{ ring: 3, ringColor: "teal.700" }}
          />
        )}
      </HStack>
      <Box bgColor='white' borderRadius='md' px={3} py={1} w='full'>
        <Text fontWeight='medium' fontSize={{ base: "inherit", lg: "xl" }}>
          {value}
        </Text>
      </Box>
    </VStack>
  );
};

export default InfoField;
