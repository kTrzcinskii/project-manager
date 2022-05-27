import {
  HStack,
  VStack,
  Text,
  IconButton,
  Box,
  Progress,
  chakra,
} from "@chakra-ui/react";
import IHomePageProject from "../../../interfaces/IHomePageProject";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import projectCardColors from "../../../utils/projectCardColors";

interface ProjectCardProps extends IHomePageProject {
  index: number;
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

  const color = projectCardColors[index];

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
            favorite ? (
              <AiFillStar fontSize={22} color='F6AD55' />
            ) : (
              <AiOutlineStar fontSize={22} color='F6AD55' />
            )
          }
          _hover={{ transform: "scale(1.3)" }}
          _focus={{}}
          _active={{}}
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
        <Text>
          Last update -{" "}
          <chakra.span fontWeight='medium' color={`${color}.600`}>
            {updatedAtFormated}
          </chakra.span>
        </Text>
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
