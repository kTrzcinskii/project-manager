import {
  VStack,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

interface ProjectProgressProps {
  color?: string;
  progress: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  color,
  progress,
}) => {
  const realColor = color ? color : "teal";

  return (
    <VStack>
      <CircularProgress
        value={progress}
        color={`${realColor}.400`}
        size='120px'
        thickness='6px'
      >
        <CircularProgressLabel color={`${realColor}.800`}>
          {progress}%
        </CircularProgressLabel>
      </CircularProgress>
      <Text fontWeight='semibold' color={`${realColor}.800`} minW='122px'>
        Current Progress
      </Text>
    </VStack>
  );
};

export default ProjectProgress;
