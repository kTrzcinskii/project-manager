import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HeroSection from "../src/components/sections/HeroSection";
import all_projects_ss from "../public/images/all_projects_ss.png";
import PhotoAndTextContainer from "../src/components/ui/main-page/PhotoAndTextContainer";
import { useRef } from "react";

const Home: NextPage = () => {
  const learMoreRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <HeroSection divRef={learMoreRef} />
      <PhotoAndTextContainer
        image1={all_projects_ss}
        header='Text'
        text='text'
        id='learn_more'
        myRef={learMoreRef}
      />
    </Box>
  );
};

export default Home;
