import {
  VStack,
  Heading,
  chakra,
  Link,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Image from "next/image";
import page_image from "../public/images/404_image.png";

const NotFoundPage: NextPage = () => {
  return (
    <VStack
      h='100vh'
      w='full'
      justifyContent='center'
      spacing={10}
      bgColor='gray.100'
    >
      <Box w={{ base: "350px", md: "380px", lg: "400px", xl: "450px" }}>
        <Image src={page_image} alt='Astronaut' layout='responsive' />
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
      <NextLink href='/' passHref>
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
