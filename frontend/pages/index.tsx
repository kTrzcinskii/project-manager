import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HeroSection from "../src/components/sections/HeroSection";
import all_projects_ss from "../public/images/all_projects_ss.png";
import PhotoAndTextContainer from "../src/components/ui/main-page/PhotoAndTextContainer";
import { useRef } from "react";
import single_project_ss from "../public/images/single_project_page_ss.png";
import filter_ss from "../public/images/filters_ss.png";
import create_project_ss from "../public/images/create_project_ss.png";
import main_stats_ss from "../public/images/main_stats.png";
import settings_ss from "../public/images/settings_ss.png";
import CreatedBy from "../src/components/ui/main-page/CreatedBy";
import ScrollToTopBtn from "../src/components/ui/main-page/ScrollToTopBtn";
import Head from "next/head";

const Home: NextPage = () => {
  const learMoreRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>Project Manager</title>
      </Head>
      <Box>
        <HeroSection divRef={learMoreRef} />
        <PhotoAndTextContainer
          image={all_projects_ss}
          header='Keep track of all your projects in one place!'
          text='With Project Manager you can conveniently take care of all your current work in one place. With priorities and status you can easily group your projects and keep them organised.'
          myRef={learMoreRef}
        />
        <PhotoAndTextContainer
          image={single_project_ss}
          header='See all the details about the project!'
          text='Progress, completed goals, creation and edit date, deadline, priority, status and more. All of above are available on your project page so that you could follow your goals and be as efficient as you can.'
          headingAlign='right'
          bgColor='blackAlpha'
        />
        <PhotoAndTextContainer
          image={filter_ss}
          header='Search trough your projects!'
          text='With those advanced filters you can comfortably find whatever project you like in your wide collection. You can filter based on every element of your project, such as title, progress, status, priortiy, etc.'
          bgColor='whiteAlpha'
          bgBox='blackAlpha.600'
        />
        <PhotoAndTextContainer
          image={create_project_ss}
          header='Easily create new projets!'
          text="With this user-friendly UI it will take you seconds to create new project and start working on it. After it's been created you can edit it, change priority, status, deadline and more with a few clicks."
          headingAlign='right'
        />
        <PhotoAndTextContainer
          image={main_stats_ss}
          header='Keep your finger on the pulse!'
          text="With the statistics section you can keep track of your recent projects, how much you have created, edited and completed. They are divided by their priority so you could find out if you have completed the most urgent ones. You can also see the same stats related to goals of those projects. It's a great way to stay productive and organised!"
          bgBox='gray.100'
          bgColor='blackAlpha'
        />
        <PhotoAndTextContainer
          image={settings_ss}
          header='Manage your account!'
          text="You have full power over your account. You can change your username, email and password anytime you want. What's more, you can delete any of your project or even your account if you only want to."
          headingAlign='right'
          bgColor='whiteAlpha'
          bgBox='gray.100'
        />
        <CreatedBy />
        <ScrollToTopBtn />
      </Box>
    </>
  );
};

export default Home;
