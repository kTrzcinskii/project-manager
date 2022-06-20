import {
  Flex,
  Heading,
  chakra,
  Text,
  VStack,
  Stack,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useQueryClient } from "react-query";
import Sidebar from "../../src/components/sections/Sidebar";
import ErrorMessage from "../../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../../src/components/ui/utils/LoadingSpinner";
import useEditProject from "../../src/hooks/mutation/useEditProject";
import useGetSingleProject from "../../src/hooks/query/useGetSingleProject";
import { priority } from "../../src/interfaces/IProject";
import minHonPagesWithSidebar from "../../src/utils/minHonPagesWithSidebar";
import isUserLoggedIn from "../../src/utils/server-side/isUserLoggedIn";
import redirectServerSide from "../../src/utils/server-side/redirectServerSide";
import setCookiesServerSide from "../../src/utils/server-side/setCookiesServerSide";
import networkErrorToastOptions from "../../src/utils/toasts/networkErrorToastOptions";
import successfulPostEditedToastOptions from "../../src/utils/toasts/successfulPostEdited";

interface ProjectPageProps {}

const color = (priority: priority | undefined) => {
  if (priority === "low") return "blue";
  if (priority === "medium") return "green";
  if (priority === "high") return "red";
  return "gray";
};

const ProjectPage: NextPage<ProjectPageProps> = ({}) => {
  const minH = minHonPagesWithSidebar;

  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useGetSingleProject(Number(id));
  console.log(data);
  const priorityColor = color(data?.priority);

  const mutation = useEditProject(Number(id));

  const [actualFavorite, setActualFavorite] = useState(data?.favorite);
  useEffect(() => {
    setActualFavorite(data?.favorite);
  }, [data]);
  const toast = useToast();
  const toastNetworError = networkErrorToastOptions();
  const toastSuccessful = successfulPostEditedToastOptions();
  const queryClient = useQueryClient();

  const handleFavClick = () => {
    setActualFavorite((favorite) => !favorite);
    mutation.mutate(
      { favorite: !actualFavorite },
      {
        onSuccess: () => {
          toast(toastSuccessful);
          queryClient.invalidateQueries(["project", id]);
        },
        onError: (error) => {
          setActualFavorite((favorite) => !favorite);
          if (axios.isAxiosError(error)) {
            if (!error.response) {
              toast(toastNetworError);
            }
            toast(toastNetworError);
          }
        },
      }
    );
  };

  if (isLoading || isError) {
    return (
      <Sidebar>
        <Flex
          w='full'
          mx='auto'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          minH={minH}
          bgColor='white'
        >
          {isLoading && <LoadingSpinner />}
          {isError && <ErrorMessage />}
        </Flex>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <VStack minH={minH} bgColor='white' w='full'>
        <VStack spacing={{ base: 5, md: 6, lg: 8 }} pt={5} w='90%' mx='auto'>
          <Stack
            w='full'
            justifyContent='space-between'
            direction={{
              base: "column-reverse",
              md: "column-reverse",
              lg: "row",
            }}
          >
            <VStack w={{ base: "full", md: "full", lg: "75%" }}>
              <HStack w='full' spacing={4} alignItems='center'>
                <Heading color='teal.800'>{data?.title}</Heading>
                <IconButton
                  aria-label='Make favorite/unfavorite'
                  variant='ghost'
                  icon={
                    actualFavorite ? (
                      <AiFillStar fontSize={30} color='F6AD55' />
                    ) : (
                      <AiOutlineStar fontSize={30} color='F6AD55' />
                    )
                  }
                  _hover={{ transform: "scale(1.3)" }}
                  _focus={{}}
                  _active={{}}
                  onClick={handleFavClick}
                />
              </HStack>
              <Text color='teal.600' fontStyle='italic' w='full'>
                {data?.description}
              </Text>
            </VStack>
            <Text fontSize='xl'>
              Priority:{" "}
              <chakra.span
                textTransform='uppercase'
                color={`${priorityColor}.500`}
              >
                {data?.priority}
              </chakra.span>
            </Text>
          </Stack>
        </VStack>
      </VStack>
    </Sidebar>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let cookies = ctx.req?.headers.cookie;

  if (!cookies) {
    return redirectServerSide("/unauthorized");
  }

  if (!cookies.includes("at=") && cookies.includes("rt=")) {
    cookies = await setCookiesServerSide(ctx, cookies);
  }

  const { logged, user } = await isUserLoggedIn(cookies);

  if (!logged || !user) {
    return redirectServerSide("/unauthorized");
  }

  return { props: { user } };
}

export default ProjectPage;
