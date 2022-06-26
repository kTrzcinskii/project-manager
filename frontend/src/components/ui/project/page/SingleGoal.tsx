import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import IGoal from "../../../../interfaces/IGoal";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import useUpdateGoal from "../../../../hooks/mutation/useUpdateGoal";
import { useQueryClient } from "react-query";
import networkErrorToastOptions from "../../../../utils/toasts/networkErrorToastOptions";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ModalContainer from "../../utils/ModalContainer";
import DeleteGoalBody from "./DeleteGoalBody";
import DeleteGoalFooter from "./DeleteGoalFooter";
import EditGoalForm from "../../../sections/EditGoalForm";
import EditGoalFooter from "./EditGoalFooter";

interface SingleGoalProps {
  goal: IGoal;
  index: number;
  projectId: number;
  color?: string;
}

const SingleGoal: React.FC<SingleGoalProps> = ({
  goal,
  index,
  color = "teal",
  projectId,
}) => {
  const btnColor = color === "pink" ? "pink.800" : color;

  const queryClient = useQueryClient();

  const toast = useToast();
  const errorToastOptions = networkErrorToastOptions();

  const updateGoalMutation = useUpdateGoal(goal.id);
  const handleUpdateGoal = () => {
    updateGoalMutation.mutate(null, {
      onSuccess: () => {
        setIsVisible(false);
        setTimeout(() => {
          queryClient.invalidateQueries(["project", projectId]);
          queryClient.invalidateQueries(["projectStats", projectId]);
        }, 300);
        setTimeout(() => setIsVisible(true), 400);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            toast(errorToastOptions);
          }
          toast(errorToastOptions);
        }
      },
    });
  };

  const [isVisible, setIsVisible] = useState(true);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const initialRefEdit = useRef<HTMLInputElement>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

  return (
    <>
      <HStack
        w='full'
        justifyContent='space-between'
        px='3'
        py='1'
        bgColor={`${color}.50`}
        _hover={{ bgColor: `${color}.100` }}
        transition='ease-in-out'
        transitionDuration='200ms'
        rounded='lg'
        as={motion.div}
        variants={{
          visible: {
            opacity: 1,
            translateX: "0%",
            transition: { duration: 0.2 },
          },
          hidden: {
            opacity: 0,
            translateX: "50%",
            transition: { duration: 0.2 },
          },
        }}
        initial='visible'
        animate={isVisible ? "visible" : "hidden"}
      >
        <HStack spacing={4} fontSize='md'>
          <Text color={`${color}.700`} fontWeight='semibold'>
            {index + 1}
          </Text>
          <Text
            color={`${color}.700`}
            fontWeight='medium'
            textDecoration={goal.completed ? "line-through" : "null"}
            fontStyle={goal.completed ? "italic" : "inherit"}
          >
            {goal.content}
          </Text>
        </HStack>
        <HStack spacing={3}>
          <IconButton
            aria-label='Mark Goal as completed/ucompleted'
            variant='ghost'
            color={btnColor}
            _hover={{ transform: "scale(1.3)" }}
            _focus={{}}
            _active={{}}
            icon={goal.completed ? <BsCircleFill /> : <BsCircle />}
            onClick={handleUpdateGoal}
          />
          <IconButton
            aria-label='Edit Goal'
            variant='ghost'
            color={btnColor}
            _hover={{ transform: "scale(1.3)" }}
            _focus={{}}
            _active={{}}
            icon={<EditIcon />}
            onClick={onOpenEdit}
          />
          <IconButton
            aria-label='Delete Goal'
            variant='ghost'
            color='red'
            _hover={{ transform: "scale(1.3)" }}
            _focus={{}}
            _active={{}}
            icon={<DeleteIcon />}
            onClick={onOpenDelete}
          />
        </HStack>
      </HStack>
      <ModalContainer
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        initialRef={initialRefEdit}
        header='Edit Goal Content'
        body={
          <EditGoalForm
            content={goal.content}
            id={goal.id}
            initialRef={initialRefEdit}
            onClose={onCloseEdit}
            setIsSubmitting={setIsSubmittingEdit}
            color={color}
            projectId={projectId}
          />
        }
        footer={
          <EditGoalFooter
            color={color}
            isSubmitting={isSubmittingEdit}
            onClose={onCloseEdit}
          />
        }
      />
      <ModalContainer
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        header='Delete Goal'
        body={<DeleteGoalBody content={goal.content} color={color} />}
        footer={
          <DeleteGoalFooter
            onClose={onCloseDelete}
            color={color}
            isSubmitting={isSubmittingDelete}
            id={goal.id}
            projectId={projectId}
            setIsSubmitting={setIsSubmittingDelete}
            setIsVisible={setIsVisible}
          />
        }
      />
    </>
  );
};

export default SingleGoal;
