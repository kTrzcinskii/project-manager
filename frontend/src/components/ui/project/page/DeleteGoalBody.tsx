import { Text, chakra } from "@chakra-ui/react";

interface DeleteGoalBodyProps {
  content: string;
  color?: string;
}

const DeleteGoalBody: React.FC<DeleteGoalBodyProps> = ({
  content,
  color = "teal",
}) => {
  return (
    <Text>
      Are you sure you want to delete goal{" "}
      <chakra.span fontWeight='semibold' color={`${color}.800`}>
        &quot;{content}&quot;
      </chakra.span>
      ?
    </Text>
  );
};

export default DeleteGoalBody;
