import { Flex, useBreakpointValue, HStack, Stack } from "@chakra-ui/react";
import { RefObject } from "react";
import HeroBtn from "./HeroBtn";
import HeroBtnSec from "./HeroBtnSec";

interface HeroBtnContainerProps {
  divRef: RefObject<HTMLDivElement>;
}

const HeroBtnContainer: React.FC<HeroBtnContainerProps> = ({ divRef }) => {
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
        <HeroBtn type='primary' href='/login'>
          Login
        </HeroBtn>
        <HeroBtn type='primary' href='/register'>
          Register
        </HeroBtn>
      </HStack>
      <Stack
        direction={"row"}
        justifyContent='center'
        mt={useBreakpointValue({
          base: 3,
          md: 0,
        })}
      >
        <HeroBtnSec divRef={divRef} />
      </Stack>
    </Flex>
  );
};

export default HeroBtnContainer;
