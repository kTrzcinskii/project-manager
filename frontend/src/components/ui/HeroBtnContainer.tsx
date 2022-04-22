import { Flex, useBreakpointValue, HStack, Stack } from "@chakra-ui/react";
import HeroBtn from "./HeroBtn";

const HeroBtnContainer: React.FC = () => {
  return (
    <Flex
      direction={useBreakpointValue({
        base: "column",
        md: "row",
      })}
      w='full'
      justifyContent={"space-between"}
    >
      <HStack justifyContent='center' spacing={{ base: 5, lg: 8 }}>
        <HeroBtn type='primary'>Login</HeroBtn>
        <HeroBtn type='primary'>Register</HeroBtn>
      </HStack>
      <Stack
        direction={"row"}
        justifyContent='center'
        mt={useBreakpointValue({
          base: 3,
          md: 0,
        })}
      >
        <HeroBtn type='secondary'>Learn More</HeroBtn>
      </Stack>
    </Flex>
  );
};

export default HeroBtnContainer;
