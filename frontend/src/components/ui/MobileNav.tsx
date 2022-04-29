import { Flex, FlexProps, IconButton, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bgColor='white'
      borderBottomWidth='1px'
      borderBottomColor='gray.200'
      justifyContent='space-between'
      w='full'
      {...rest}
    >
      <Text fontSize='3xl' ml='8' fontWeight='bold' color='teal.500'>
        Project Manager
      </Text>
      <IconButton
        colorScheme='teal'
        variant='ghost'
        onClick={onOpen}
        aria-label='Open menu'
        icon={<FiMenu />}
        fontSize='30'
      />
    </Flex>
  );
};

export default MobileNav;
