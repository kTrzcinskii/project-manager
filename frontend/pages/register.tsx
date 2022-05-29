import {
  VStack,
  useBreakpointValue,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import RegisterForm from "../src/components/sections/RegisterForm";
import FormContainer from "../src/components/ui/form/FormContainer";
import GradientBg from "../src/components/ui/utils/GradientBg";
import NextLink from "next/link";
import { motion } from "framer-motion";

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
            as={motion.h1}
            initial={{
              opacity: 0,
              translateX: "-150%",
            }}
            animate={{
              opacity: 1,
              translateX: "0%",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.55,
              },
            }}
          >
            Register
          </Heading>
          <RegisterForm />
          <Text
            color='gray.500'
            fontSize={useBreakpointValue({ base: "sm", md: "md" })}
            as={motion.p}
            initial={{
              opacity: 0,
              translateX: "-150%",
            }}
            animate={{
              opacity: 1,
              translateX: "0%",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
                delay: 1.15,
              },
            }}
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
