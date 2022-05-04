import { Box, Button } from "@chakra-ui/react";

const DeleteAccountBtn: React.FC = () => {
  return (
    <Box py={{ base: 6, md: 10, lg: 16 }}>
      <Button
        mx='auto'
        colorScheme='red'
        _focus={{ ring: 3, ringColor: "red.800" }}
      >
        Delete account
      </Button>
    </Box>
  );
};

export default DeleteAccountBtn;
