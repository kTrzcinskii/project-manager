import { Container, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import { RefObject } from "react";
import HeroBtnContainer from "../ui/hero/HeroBtnContainer";
import HeroText from "../ui/hero/HeroText";

interface HeroSectionProps {
  divRef: RefObject<HTMLDivElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ divRef }) => {
  return (
    <Flex
      w='full'
      h='100vh'
      backgroundImage={"url(/images/hero_image.jpg)"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      id='hero_section'
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-l, blackAlpha.700, blackAlpha.600)"}
      >
        <Container
          maxW={useBreakpointValue({
            base: "90%",
            md: "2xl",
            lg: "3xl",
          })}
        >
          <VStack align={"flex-start"} spacing={6}>
            <HeroText />
            <HeroBtnContainer divRef={divRef} />
          </VStack>
        </Container>
      </VStack>
    </Flex>
  );
};

export default HeroSection;
