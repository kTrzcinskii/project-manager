import { Box, Button, useBreakpointValue } from "@chakra-ui/react";
import { ReactText } from "react";

interface ChangeBtnProps {
  onClick: () => void;
}

const ChangeBtn: React.FC<ChangeBtnProps> = ({ onClick }) => {
  return (
    <Box pos='absolute' bottom={0} right={0}>
      <Button
        colorScheme='teal'
        onClick={onClick}
        size={useBreakpointValue({ base: "sm", lg: "md" })}
        w={{ base: "60px", md: "80px", lg: "90px" }}
        h={{ base: "32px", md: "32px", lg: "38px" }}
        _focus={{ ring: 3, ringColor: "teal.700" }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default ChangeBtn;
