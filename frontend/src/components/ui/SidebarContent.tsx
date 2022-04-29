import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import NavItem from "./NavItem";
import SidebarLinks from "./SidebarLinks";

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  onClose,
  ...rest
}) => {
  return (
    <Box
      bgColor='white'
      borderRight='1px'
      borderRightColor='gray.200'
      w={{ base: "full", md: 80 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='3xl' fontWeight='bold' color='teal.500'>
          Project Manager
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          fontSize='18'
          color='red.400'
          _hover={{ bgColor: "red.50" }}
        />
      </Flex>
      {SidebarLinks.map((link) => (
        <NavItem key={link.text} link={link.link} icon={link.icon}>
          {link.text}
        </NavItem>
      ))}
      <Flex
        mt={{ base: 20, md: 28 }}
        justifyContent='center'
        alignItems='center'
        pos='absolute'
        bottom='0'
        w='full'
        mb={28}
      >
        <Button colorScheme='teal' w='full' maxW='200px'>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
