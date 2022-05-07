import {
  VStack,
  Heading,
  useBreakpointValue,
  Text,
  Link,
  chakra,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AccountDeleted: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <VStack
      h='100vh'
      w='full'
      justifyContent='center'
      spacing={10}
      bgColor='gray.100'
    >
      <Heading
        size={useBreakpointValue({ base: "lg", md: "xl" })}
        fontWeight='normal'
        px={5}
        textAlign='center'
      >
        Your account has been successfully{" "}
        <chakra.span color='red'>deleted</chakra.span>.
      </Heading>
      <Text
        fontSize={useBreakpointValue({ base: "md", md: "xl" })}
        px={5}
        textAlign='center'
      >
        You will be automatically redirected to home page in 5 seconds, or you
        can{" "}
        <NextLink href='/' passHref>
          <Link color='teal.500'>click here</Link>
        </NextLink>
        .
      </Text>
    </VStack>
  );
};

export default AccountDeleted;
