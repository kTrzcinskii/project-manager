import {
  HStack,
  VStack,
  Text,
  IconButton,
  Box,
  Progress,
  chakra,
  useToast,
} from "@chakra-ui/react";
import IHomePageProject from "../../../interfaces/IHomePageProject";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import projectCardColors from "../../../utils/projectCardColors";
import useEditProject from "../../../hooks/mutation/useEditProject";
import axios from "axios";
import { useQueryClient } from "react-query";
import networkErrorToastOptions from "../../../utils/toasts/networkErrorToastOptions";
import successfulPostEditedToastOptions from "../../../utils/toasts/successfulPostEdited";

interface ProjectCardProps extends IHomePageProject {
  index: number;
  page: number;
  query: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  favorite,
  progressBar,
  priority,
  status,
  title,
  timeLeft,
  id,
  createdAt: createdAtDate,
  updatedAt: updatedAtDate,
  index,
  completedAt: completedAtDate,
  page,
  query,
}) => {
  const [createdAt, setCreatedAt] = useState<null | Date>(null);
  useEffect(() => {
    const date = new Date(createdAtDate);
    setCreatedAt(date);
  }, [createdAtDate]);

  let createdAtFormated = "";
  if (createdAt) {
    createdAtFormated = format(createdAt, "MMMM d, y");
  }

  const [updatedAt, setUpdatedAt] = useState<null | Date>(null);
  useEffect(() => {
    const date = new Date(updatedAtDate);
    setUpdatedAt(date);
  }, [updatedAtDate]);

  let updatedAtFormated = "";
  if (updatedAt) {
    updatedAtFormated = format(updatedAt, "HH:mm, do MMMM y");
  }

  const [completedAt, setCompletedAt] = useState<null | Date>(null);
  useEffect(() => {
    const date = new Date(completedAtDate);
    setCompletedAt(date);
  }, [completedAtDate]);

  let completedAtFormated = "";
  if (completedAt) {
    completedAtFormated = format(completedAt, "HH:mm, do MMMM y");
  }

  const color = projectCardColors[index];

  const toast = useToast();
  const toastNetworError = networkErrorToastOptions();
  const toastSuccessful = successfulPostEditedToastOptions();

  const queryClient = useQueryClient();

  const [acctualFavorite, setAcctualFavorite] = useState(favorite);

  const favoriteMutation = useEditProject(id);
  const handleClick = () => {
    setAcctualFavorite((favorite) => !favorite);
    favoriteMutation.mutate(
      { favorite: !favorite },
      {
        onSuccess: () => {
          toast(toastSuccessful);
          queryClient.invalidateQueries(["allProjects", page, query]);
        },
        onError: (error) => {
          setAcctualFavorite((favorite) => !favorite);
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

  return (
    <VStack
      w='full'
      borderWidth={3}
      borderRadius='lg'
      borderColor={`${color}.100`}
      bgColor={`${color}.50`}
      pos='relative'
      minH='412px'
    >
      <HStack w='full' justifyContent='space-between' mt={2} px={4}>
        <IconButton
          aria-label='Make favorite/unfavorite'
          variant='ghost'
          icon={
            acctualFavorite ? (
              <AiFillStar fontSize={22} color='F6AD55' />
            ) : (
              <AiOutlineStar fontSize={22} color='F6AD55' />
            )
          }
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
          onClick={handleClick}
        />
        <Text fontWeight='semibold'>{createdAtFormated}</Text>
      </HStack>
      <Box pt={8}>
        <Text fontSize='2xl' fontWeight='medium' color={`${color}.900`}>
          {title}
        </Text>
      </Box>
      <Box pt={8} w='80%'>
        <HStack w='95%' justifyContent='space-between' mx='auto' fontSize='sm'>
          <Text>Progress</Text>
          <Text>{progressBar}%</Text>
        </HStack>
        <Progress
          value={progressBar}
          colorScheme={color}
          size='sm'
          rounded='md'
          hasStripe={true}
          isAnimated={true}
        />
      </Box>
      <Box pt={4} w='80%'>
        <Text>
          Status -{" "}
          <chakra.span
            textTransform='capitalize'
            fontWeight='medium'
            color={`${color}.700`}
          >
            {status === "inProgress" ? "in progress" : status}
          </chakra.span>
        </Text>
      </Box>
      <Box pt={4} w='80%'>
        {status === "finished" ? (
          <Text>
            Completed on{" "}
            <chakra.span fontWeight='medium' color={`${color}.600`}>
              {completedAtFormated}
            </chakra.span>
          </Text>
        ) : (
          <Text>
            Last updated on{" "}
            <chakra.span fontWeight='medium' color={`${color}.600`}>
              {updatedAtFormated}
            </chakra.span>
          </Text>
        )}
      </Box>
      <HStack
        w='80%'
        justifyContent='space-between'
        pt={5}
        pb={4}
        pos='absolute'
        bottom={0}
      >
        <VStack alignItems='flex-start' spacing={0}>
          <Text>Priority</Text>
          <Text
            textTransform='capitalize'
            fontWeight='medium'
            color={`${color}.700`}
          >
            {priority}
          </Text>
        </VStack>
        {timeLeft && (
          <VStack alignItems='flex-end' spacing={0}>
            <Text>Time left</Text>
            <Text
              textTransform='uppercase'
              fontWeight='medium'
              color={`${color}.600`}
            >
              {timeLeft}
            </Text>
          </VStack>
        )}
      </HStack>
    </VStack>
  );
};

export default ProjectCard;
