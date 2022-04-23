import {
  Container,
  Heading,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../src/components/sections/LoginForm";

const Login: NextPage = () => {
  return (
    <VStack alignItems='center' justifyContent='center' minH='100vh'>
      <Container
        maxW={useBreakpointValue({
          base: "90%",
          md: "2xl",
        })}
      >
        <VStack
          w='full'
          spacing={useBreakpointValue({ base: 5, md: 6, lg: 8 })}
          align='flex-start'
        >
          <Heading
            mx='auto'
            size={useBreakpointValue({ base: "lg", md: "xl" })}
          >
            Login to Your Account
          </Heading>
          <LoginForm />
        </VStack>
      </Container>
    </VStack>
  );
};

export default Login;
