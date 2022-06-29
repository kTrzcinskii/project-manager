import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import settings_image from "../public/images/settings_image.svg";
import Sidebar from "../src/components/sections/Sidebar";
import AccountDetails from "../src/components/ui/settings/AccountDetails";
import DeleteAccountBtn from "../src/components/ui/settings/DeleteAccountBtn";
import ErrorMessage from "../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../src/components/ui/utils/LoadingSpinner";
import useMe from "../src/hooks/query/useMe";
import minHonPagesWithSidebar from "../src/utils/minHonPagesWithSidebar";

const Settings: NextPage = () => {
  const minH = minHonPagesWithSidebar;

  const { data, isError, isLoading } = useMe();
  const router = useRouter();

  if (isLoading) {
    return (
      <Flex h='full' w='full' justifyContent='center' alignItems='center'>
        <LoadingSpinner />
      </Flex>
    );
  }
  if (!data || isError) {
    router.push("/unauthorized");
    return <ErrorMessage />;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Sidebar>
        <HStack
          minH={minH}
          w='full'
          px={{ base: 0, md: 0, lg: 5 }}
          justifyContent={{
            base: "center",
            md: "center",
            lg: "center",
            xl: "space-around",
          }}
        >
          <VStack spacing={{ base: 6, md: 10, lg: 14 }} pt={{ base: 3, md: 6 }}>
            <Heading
              color='teal.600'
              fontSize={{ base: "3xl", md: "4xl" }}
              as={motion.h1}
              initial={{
                opacity: 0,
                translateY: "-150%",
              }}
              animate={{
                opacity: 1,
                translateY: "0%",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              }}
            >
              Account Settings
            </Heading>
            <AccountDetails user={data} />
            <DeleteAccountBtn />
          </VStack>
          <Box w={{ base: 0, md: 0, lg: "0", xl: "400px" }}>
            <Image src={settings_image} alt='Working man' layout='responsive' />
          </Box>
        </HStack>
      </Sidebar>
    </>
  );
};

export default Settings;
