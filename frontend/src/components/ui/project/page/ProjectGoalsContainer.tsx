import { Heading, VStack } from "@chakra-ui/react";
import IGoal from "../../../../interfaces/IGoal";

interface ProjectGoalsContainerProps {
  goals: IGoal[];
  color?: string;
}

const ProjectGoalsContainer: React.FC<ProjectGoalsContainerProps> = ({
  color = "teal",
  goals,
}) => {
  return (
    <VStack w='full'>
      <Heading
        color={`${color}.600`}
        fontSize={{ base: "xl", md: "2xl" }}
        w='full'
      >
        Goals
      </Heading>
    </VStack>
  );
};

export default ProjectGoalsContainer;
