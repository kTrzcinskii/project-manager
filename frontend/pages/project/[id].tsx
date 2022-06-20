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
  CircularProgress,
  CircularProgressLabel,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useQueryClient } from "react-query";
import Sidebar from "../../src/components/sections/Sidebar";
import DatesContainer from "../../src/components/ui/project/page/DatesContainer";
import PriorityAndStatusBox from "../../src/components/ui/project/page/PriorityAndStatusBox";
import ProjectProgress from "../../src/components/ui/project/page/ProjectProgress";
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

const getPriorityColor = (priority: priority | undefined) => {
  if (priority === "low") return "blue";
  if (priority === "medium") return "green";
  if (priority === "high") return "red";
  return "gray";
};

const ProjectPage: NextPage<ProjectPageProps> = ({}) => {
  const minH = minHonPagesWithSidebar;

  const router = useRouter();
  const { id, color } = router.query;
  const myColor = typeof color === "string" ? color : "teal";

  const { data, isLoading, isError, error } = useGetSingleProject(Number(id));
  console.log(data);
  const priorityColor = getPriorityColor(data?.priority);

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

  if (isError && axios.isAxiosError(error)) {
    if (error.response?.data.statusCode === 404) router.push("/404");
  }

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
        <VStack
          spacing={{ base: 5, md: 6, lg: 8 }}
          pt={5}
          w={{ base: "90%", md: " 85%", lg: "80%" }}
          mx='auto'
        >
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
                <Heading color={`${myColor}.800`}>{data?.title}</Heading>
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
              <Text
                color={`${myColor}.600`}
                fontStyle='italic'
                w='full'
                textAlign='justify'
              >
                {data?.description}
              </Text>
            </VStack>
            <PriorityAndStatusBox
              priority={data?.priority}
              status={data?.status}
              priorityColor={priorityColor}
              color={myColor}
            />
          </Stack>
          <Stack
            w='full'
            justifyContent='space-around'
            alignItems='center'
            direction={{
              base: "column",
              md: "column",
              lg: "row",
            }}
            spacing={7}
          >
            {data?.createdAt && data.updatedAt && (
              <DatesContainer
                createdAt={data?.createdAt}
                updatedAt={data?.updatedAt}
                completedAt={data?.completedAt}
                color={myColor}
              />
            )}
            {data && (
              <ProjectProgress progress={data?.progressBar} color={myColor} />
            )}
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
