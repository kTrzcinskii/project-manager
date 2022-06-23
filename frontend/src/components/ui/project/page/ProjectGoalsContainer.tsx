import { Heading, VStack } from "@chakra-ui/react";
import IGoal from "../../../../interfaces/IGoal";
import SingleGoal from "./SingleGoal";

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
      <VStack w='full'>
        {goals.map((goal, index) => (
          <SingleGoal goal={goal} key={goal.id} index={index} color={color} />
        ))}
      </VStack>
    </VStack>
  );
};

export default ProjectGoalsContainer;
