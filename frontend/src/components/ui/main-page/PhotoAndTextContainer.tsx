import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { RefObject } from "react";

interface PhotoAndTextContainerProps {
  image1: StaticImageData;
  image2?: StaticImageData;
  header: string;
  text: string;
  id: string;
  pos?: "left" | "right";
  bgColor?: string;
  myRef: RefObject<HTMLDivElement>;
}

const PhotoAndTextContainer: React.FC<PhotoAndTextContainerProps> = ({
  image1,
  image2,
  header,
  text,
  id,
  pos = "left",
  bgColor = "gray",
  myRef,
}) => {
  const realDir = pos === "left" ? "row" : "row-reverse";

  return (
    <Stack
      minH='100vh'
      w='full'
      direction={{ base: "column", md: "column", lg: realDir }}
      id={id}
      justifyContent={{ base: "center", md: "center", lg: "space-around" }}
      alignItems='center'
      spacing={{ base: 5, md: 6, lg: 10 }}
      bgColor={`${bgColor}.100`}
      ref={myRef}
    >
      <VStack w={{ base: "350px", md: "450px", lg: "650px" }}>
        <Box
          w='full'
          borderWidth={3}
          borderColor='teal.500'
          rounded='lg'
          p={2}
          bgColor='white'
        >
          <Image alt='' layout='responsive' src={image1} />
        </Box>
        {image2 && (
          <Box w='full'>
            <Image alt='' layout='responsive' src={image2} />
          </Box>
        )}
      </VStack>
      <VStack>
        <Heading>{header}</Heading>
        <Text>{text}</Text>
      </VStack>
    </Stack>
  );
};

export default PhotoAndTextContainer;
