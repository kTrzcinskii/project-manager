import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, link, children, ...rest }) => {
  return (
    <NextLink href={link} passHref>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align='center'
          p='4'
          mx='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          color='teal.600'
          fontSize='18'
          _hover={{
            bgColor: "teal.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr='4'
              fontSize='20'
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default NavItem;
