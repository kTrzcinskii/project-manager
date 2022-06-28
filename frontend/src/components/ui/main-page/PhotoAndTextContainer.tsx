import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { RefObject } from "react";

interface PhotoAndTextContainerProps {
  image: StaticImageData;
  header: string;
  text: string;
  bgColor?: string;
  myRef?: RefObject<HTMLDivElement>;
  headingAlign?: "left" | "right";
  bgBox?: string;
}

const PhotoAndTextContainer: React.FC<PhotoAndTextContainerProps> = ({
  image,
  header,
  text,
  bgColor = "gray",
  myRef,
  headingAlign = "left",
  bgBox = "white",
}) => {
  return (
    <Stack
      minH='100vh'
      w='full'
      px={{ base: 5, md: 5, lg: 12 }}
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={{ base: 5, md: 6, lg: 10 }}
      bgColor={`${bgColor}.50`}
      ref={myRef}
      textAlign='justify'
    >
      <Box
        w={{ base: "350px", md: "400px", lg: "600px", xl: "750px" }}
        borderWidth={3}
        borderColor='teal.500'
        rounded='lg'
        p={2}
        bgColor={bgBox}
      >
        <Image alt='' layout='responsive' src={image} />
      </Box>
      <VStack
        w={{ base: "95%", md: " 90%", lg: "600px", xl: "750px" }}
        textAlign={headingAlign}
      >
        <Heading w='full' color='teal.600'>
          {header}
        </Heading>
        <Text w='full'>{text}</Text>
      </VStack>
    </Stack>
  );
};

export default PhotoAndTextContainer;
