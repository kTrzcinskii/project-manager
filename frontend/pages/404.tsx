import {
  VStack,
  Heading,
  chakra,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <VStack h='100vh' w='full' justifyContent='center' spacing={10}>
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
