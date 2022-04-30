import {
  Heading,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../src/components/sections/LoginForm";
import NextLink from "next/link";
import GradientBg from "../src/components/ui/utils/GradientBg";
import FormContainer from "../src/components/ui/form/FormContainer";

const Login: NextPage = () => {
  return (
    <GradientBg>
      <FormContainer>
        <VStack
          w='full'
          spacing={useBreakpointValue({ base: 4, md: 6, lg: 8 })}
          align='center'
        >
          <Heading
            size={useBreakpointValue({ base: "lg", md: "xl" })}
            color='teal.800'
          >
            Login
          </Heading>
          <LoginForm />
          <Text
            color='gray.500'
            fontSize={useBreakpointValue({ base: "sm", md: "md" })}
          >
            Don&apos;t have an account?{" "}
            <NextLink href='/register' passHref>
              <Link color='teal.600' fontWeight='semibold'>
                Create one here!
              </Link>
            </NextLink>
          </Text>
        </VStack>
      </FormContainer>
    </GradientBg>
  );
};

export default Login;
