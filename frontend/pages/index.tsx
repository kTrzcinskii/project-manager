import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HeroSection from "../src/components/sections/HeroSection";
import all_projects_ss from "../public/images/all_projects_ss.png";
import PhotoAndTextContainer from "../src/components/ui/main-page/PhotoAndTextContainer";
import { useRef } from "react";
import single_project_ss from "../public/images/single_project_page_ss.png";

const Home: NextPage = () => {
  const learMoreRef = useRef<HTMLDivElement>(null);

  return (
    <Box>
      <HeroSection divRef={learMoreRef} />
      <PhotoAndTextContainer
        image={all_projects_ss}
        header='Keep track of all your projects in one place!'
        text='With Project Manager you can easily take care of all your current work in one place. With priorities and status you can easily group your projects and keep it organised.'
        myRef={learMoreRef}
      />
      <PhotoAndTextContainer
        image={single_project_ss}
        header='See all the details about the project!'
        text='Progress, completed goals, creation and edit date, deadline, priority, status and more. All of above are available on your project page so that you could easily follow your goals and be as efficient as you can.'
        headingAlign='right'
        bgColor='blackAlpha'
      />
    </Box>
  );
};

export default Home;
