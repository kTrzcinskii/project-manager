import {
  VStack,
  useBreakpointValue,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";

const HeroText: React.FC = () => {
  return (
    <VStack
      align={"flex-start"}
      spacing={useBreakpointValue({
        base: 3,
        md: 4,
        lg: 6,
      })}
    >
      <Heading
        color={"teal.400"}
        fontWeight={600}
        lineHeight={1.2}
        fontSize={useBreakpointValue({
          base: "4xl",
          md: "5xl",
          lg: "6xl",
          xl: "7xl",
        })}
      >
        Project Manager
      </Heading>
      <Text
        color={"white"}
        fontSize={useBreakpointValue({
          base: "md",
          md: "xl",
          lg: "2xl",
        })}
        align='justify'
      >
        Take care of all your projects in one place with this powerful website.
        Project Manager has{" "}
        <Box as='span' color='teal.400'>
          all you need
        </Box>{" "}
        to conveniently keep track of your goals and progress!
      </Text>
    </VStack>
  );
};

export default HeroText;
