import { Box, Button, Heading, useDisclosure, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import IGoal from "../../../../interfaces/IGoal";
import CreateGoalForm from "../../../sections/CreateGoalForm";
import ModalContainer from "../../utils/ModalContainer";
import SingleGoal from "./SingleGoal";

interface ProjectGoalsContainerProps {
  goals: IGoal[];
  id: number;
  color?: string;
}

const ProjectGoalsContainer: React.FC<ProjectGoalsContainerProps> = ({
  color = "teal",
  goals,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
        <Box pt={4}>
          <Button
            colorScheme={color}
            _focus={{ ring: 3, ringColor: `${color}.800` }}
            onClick={onOpen}
          >
            Add Goal
          </Button>
        </Box>
      </VStack>
      <ModalContainer
        isOpen={isOpen}
        onClose={onClose}
        header='Add Goal'
        body={
          <CreateGoalForm
            initialRef={initialRef}
            onClose={onClose}
            projectId={id}
            color={color}
          />
        }
        footer={<></>}
      />
    </>
  );
};

export default ProjectGoalsContainer;
