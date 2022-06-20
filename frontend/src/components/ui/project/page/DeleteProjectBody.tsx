import { Text, chakra } from "@chakra-ui/react";

interface DeleteProjectBodyProps {
  title?: string;
}

const DeleteProjectBody: React.FC<DeleteProjectBodyProps> = ({ title }) => {
  return (
    <Text>
      You are about to delete your project &quot;{title}&quot;. All of the
      content related to this project will be removed. This action is{" "}
      <chakra.span fontWeight='bold'>irreversible</chakra.span>. Are you sure
      you want to continue?
    </Text>
  );
};

export default DeleteProjectBody;
