import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HeroSection from "../components/sections/HeroSection";

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />
    </Box>
  );
};

export default Home;
