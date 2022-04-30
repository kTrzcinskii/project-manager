import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";
import MobileNav from "../ui/sidebar/MobileNav";
import SidebarContent from "../ui/sidebar/SidebarContent";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <Box minH='100vh' bgColor='gray.100'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 80 }} p='4'>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
