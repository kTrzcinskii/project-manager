import {
  VStack,
  useBreakpointValue,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import RegisterForm from "../src/components/sections/RegisterForm";
import FormContainer from "../src/components/ui/FormContainer";
import GradientBg from "../src/components/ui/GradientBg";
import NextLink from "next/link";

const Register: NextPage = () => {
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
            Register
          </Heading>
          <RegisterForm />
          <Text
            color='gray.500'
            fontSize={useBreakpointValue({ base: "sm", md: "md" })}
          >
            Already have an account?{" "}
            <NextLink href='/login' passHref>
              <Link color='teal.600' fontWeight='semibold'>
                Login here!
              </Link>
            </NextLink>
          </Text>
        </VStack>
      </FormContainer>
    </GradientBg>
  );
};

export default Register;
