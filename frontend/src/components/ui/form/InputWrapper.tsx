import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  HStack,
  IconButton,
  Divider,
  Box,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface InputWrapperProps {
  title: string;
  children: ReactNode;
  dontShowDivider?: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  title,
  children,
  dontShowDivider,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <VStack w='full'>
      <HStack
        w='full'
        justifyContent='space-between'
        onClick={onToggle}
        cursor='pointer'
        role='group'
      >
        <Text fontSize='md' fontWeight='semibold' color='teal.800'>
          {title}
        </Text>
        <IconButton
          aria-label='Show content'
          _focus={{}}
          variant='unstyled'
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          color='teal.800'
          fontSize='xl'
          _groupHover={{ color: "teal.500" }}
        />
      </HStack>
      {dontShowDivider ? isOpen ? <Divider /> : null : <Divider />}
      <Collapse in={isOpen} animateOpacity>
        <Box h='full' w='full' py={3} px={2}>
          {children}
        </Box>
      </Collapse>
    </VStack>
  );
};

export default InputWrapper;
