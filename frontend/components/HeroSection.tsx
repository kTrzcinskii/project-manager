import {
  Flex,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import HeroBtn from "./HeroBtn";

const HeroSection: React.FC = ({}) => {
  return (
    <Flex
      w='full'
      h='100vh'
      backgroundImage={"url(/images/hero_image.jpg)"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-l, blackAlpha.700, blackAlpha.600)"}
      >
        <Stack
          maxW={useBreakpointValue({
            base: "90%",
            md: "2xl",
            lg: "3xl",
          })}
          align={"flex-start"}
          spacing={6}
        >
          <Stack
            direction={"column"}
            spacing={useBreakpointValue({
              base: 3,
              md: 4,
              lg: 6,
              xl: 8,
            })}
          >
            <Heading
              color={"teal.300"}
              fontWeight={600}
              lineHeight={1.2}
              fontSize={useBreakpointValue({
                base: "3xl",
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
            >
              Take care of all your projects in one place with this powerful
              website. Project Manager has all you need to conveniently keep
              track of your goals and progress!
            </Text>
          </Stack>
          <Stack direction={"row"} w='full' justifyContent='center' spacing={5}>
            <HeroBtn type='primary'>Login</HeroBtn>
            <HeroBtn type='primary'>Register</HeroBtn>
          </Stack>
          <Stack mt={3} direction={"row"} w='full' justifyContent='center'>
            <HeroBtn type='secondary'>Learn More</HeroBtn>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default HeroSection;
