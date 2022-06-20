import {
  Box,
  chakra,
  Heading,
  Link,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import page_image from "../public/images/404_image.png";
import useMe from "../src/hooks/query/useMe";

const NotFoundPage: NextPage = () => {
  const { isSuccess } = useMe();

  const link = isSuccess ? "/home" : "/";

  return (
    <VStack
      h='100vh'
      w='full'
      justifyContent='center'
      spacing={10}
      bgColor='gray.100'
    >
      <Box w={{ base: "350px", md: "380px", lg: "400px", xl: "450px" }}>
        <Image
          src={page_image}
          alt='Astronaut'
          layout='responsive'
          priority={true}
          placeholder='blur'
        />
      </Box>
      <Heading
        size={useBreakpointValue({ base: "2xl", md: "3xl" })}
        fontWeight='normal'
      >
        <chakra.span color='teal.600' fontWeight='semibold'>
          404
        </chakra.span>{" "}
        Page not found
      </Heading>
      <NextLink href={link} passHref>
        <Link
          color='teal.500'
          fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
        >
          Go to Home page
        </Link>
      </NextLink>
    </VStack>
  );
};

export default NotFoundPage;
