import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const CreatedBy: React.FC = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      w='full'
      minH='300px'
      bgColor='gray.700'
    >
      <Text fontSize='2xl' color='white'>
        Created by{" "}
        <NextLink href='https://github.com/kTrzcinskii' passHref={true}>
          <Link fontWeight='semibold' color='teal' target='_blank'>
            Kacper Trzciński
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};

export default CreatedBy;
