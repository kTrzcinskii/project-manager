import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useQueryClient } from "react-query";
import Sidebar from "../../src/components/sections/Sidebar";
import BtnContainer from "../../src/components/ui/project/page/BtnContainer";
import DatesContainer from "../../src/components/ui/project/page/DatesContainer";
import PriorityAndStatusBox from "../../src/components/ui/project/page/PriorityAndStatusBox";
import ProjectGoalsContainer from "../../src/components/ui/project/page/ProjectGoalsContainer";
import ProjectProgress from "../../src/components/ui/project/page/ProjectProgress";
import SingleProjectStats from "../../src/components/ui/project/page/SingleProjectStats";
import ChooseDate from "../../src/components/ui/statistics/ChooseDate";
import ErrorMessage from "../../src/components/ui/utils/ErrorMessage";
import LoadingSpinner from "../../src/components/ui/utils/LoadingSpinner";
import useEditProject from "../../src/hooks/mutation/useEditProject";
import useGetSingleProject from "../../src/hooks/query/useGetSingleProject";
import useMe from "../../src/hooks/query/useMe";
import { priority } from "../../src/interfaces/IProject";
import minHonPagesWithSidebar from "../../src/utils/minHonPagesWithSidebar";
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

  const [query, setQuery] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [dateType, setDateType] = useState<"specific-date" | "date-range">(
    "date-range"
  );

  const {
    data: dataAuth,
    isError: isErrorAuth,
    isLoading: isLoadingAuth,
  } = useMe();

  if (isLoadingAuth) {
    return (
      <Flex h='full' w='full' justifyContent='center' alignItems='center'>
        <LoadingSpinner />
      </Flex>
    );
  }
  if (!dataAuth || isErrorAuth) {
    router.push("/unauthorized");
    return <ErrorMessage />;
  }

  if (isLoading || isError || !data) {
    return (
      <>
        <Head>
          <title>Project</title>
        </Head>
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
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
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
                lg: "column-reverse",
                xl: "row",
              }}
              spacing={{ base: 0, md: 0, lg: 0, xl: 6 }}
            >
              <VStack w={{ base: "full", md: "full", lg: "full", xl: "70%" }}>
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
                  fontSize='lg'
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
              {data?.createdAt && data.updatedAt && data.deadline && (
                <DatesContainer
                  createdAt={data?.createdAt}
                  updatedAt={data?.updatedAt}
                  completedAt={data?.completedAt}
                  deadline={data?.deadline}
                  color={myColor}
                />
              )}
              {data && (
                <ProjectProgress progress={data?.progressBar} color={myColor} />
              )}
            </Stack>
            <ProjectGoalsContainer
              goals={data?.goals}
              color={myColor}
              id={Number(id)}
            />
            <Heading
              color={`${myColor}.600`}
              fontSize={{ base: "xl", md: "2xl" }}
            >
              Project&apos;s Stats
            </Heading>
            <ChooseDate
              dateType={dateType}
              setDateType={setDateType}
              isCustomInput={isCustomInput}
              setIsCustomInput={setIsCustomInput}
              setQuery={setQuery}
              color={myColor}
            />
            <SingleProjectStats id={Number(id)} query={query} />
            <BtnContainer id={Number(id)} title={data?.title} color={myColor} />
          </VStack>
        </VStack>
      </Sidebar>
    </>
  );
};

export default ProjectPage;
