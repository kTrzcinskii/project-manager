import {
  Container,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../src/components/sections/LoginForm";
import NextLink from 'next/link'

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
          spacing={useBreakpointValue({ base: 5, md: 8, lg: 12 })}
          align='flex-start'
        >
          <VStack w='full' align='flex-start' spacing={3}>
            <Heading
              mx='auto'
              size={useBreakpointValue({ base: "lg", md: "xl" })}
            >
              Login to Your Account
            </Heading>
            <Text>
              Don&apos;t have an account?{" "}
              <NextLink href='register' passHref>
                <Link>Create one here!</Link>
              </NextLink>
            </Text>
          </VStack>
          <LoginForm />
        </VStack>
      </Container>
    </VStack>
  );
};

export default Login;
