import { ChevronDownIcon } from "@chakra-ui/icons";
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
import { ReactNode, useState } from "react";

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
      >
        <Text fontSize='md' fontWeight='semibold' color='teal.800'>
          {title}
        </Text>
        <IconButton
          aria-label='Show content'
          _focus={{}}
          variant='unstyled'
          icon={<ChevronDownIcon />}
          color='teal.800'
          fontSize='xl'
        />
      </HStack>
      {dontShowDivider ? isOpen ? <Divider /> : null : <Divider />}
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </VStack>
  );
};

export default InputWrapper;
