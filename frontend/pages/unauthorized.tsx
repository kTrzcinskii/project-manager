import {
  Heading,
  Link,
  Text,
  useBreakpointValue,
  VStack,
  chakra,
  Box,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import unauthorized_image from "../public/images/unauthorized_image.svg";
import Head from "next/head";

const Unauthorized: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/login"), 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <>
      <Head>
        <title>Unauthorized</title>
      </Head>
      <VStack
        h='100vh'
        w='full'
        justifyContent='center'
        spacing={10}
        bgColor='gray.100'
      >
        <Box w={{ base: "350px", md: "380px", lg: "400px", xl: "450px" }}>
          <Image
            src={unauthorized_image}
            alt='Unauthorized Image'
            layout='responsive'
          />
        </Box>
        <Heading
          size={useBreakpointValue({ base: "lg", md: "xl" })}
          fontWeight='normal'
          px={5}
          textAlign='center'
        >
          This page is available only for{" "}
          <chakra.span fontWeight='semibold' color='teal.700'>
            authenticated
          </chakra.span>{" "}
          users.
        </Heading>
        <Text
          fontSize={useBreakpointValue({ base: "md", md: "xl" })}
          px={5}
          textAlign='center'
        >
          You will be automatically redirected to login page in 5 seconds, or
          you can{" "}
          <NextLink href='/login' passHref>
            <Link color='teal.500'>click here</Link>
          </NextLink>
          .
        </Text>
      </VStack>
    </>
  );
};

export default Unauthorized;
