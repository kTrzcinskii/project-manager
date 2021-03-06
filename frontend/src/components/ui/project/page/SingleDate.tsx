import { HStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

interface SingleDateProps {
  date: string;
  title: string;
  color?: string;
  showDeadlineFormat?: boolean;
}

const SingleDate: React.FC<SingleDateProps> = ({
  date,
  title,
  color,
  showDeadlineFormat,
}) => {
  const actualDate = new Date(date);
  const formatType = showDeadlineFormat ? "do MMMM y" : "HH:mm, do MMMM y";
  const formatedDate = format(actualDate, formatType);

  const realColor = color ? color : "teal";

  return (
    <HStack spacing={2} w='full'>
      <Text fontWeight='semibold' color={`${realColor}.700`}>
        {title}:
      </Text>
      <Text color='gray.700'>{formatedDate}</Text>
    </HStack>
  );
};

export default SingleDate;
