import { HStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

interface SingleDateProps {
  date: string;
  title: string;
}

const SingleDate: React.FC<SingleDateProps> = ({ date, title }) => {
  const actualDate = new Date(date);
  const formatedDate = format(actualDate, "HH:mm, do MMMM y");

  return (
    <HStack spacing={2} w='full'>
      <Text fontWeight='semibold' color='teal.700'>
        {title}:
      </Text>
      <Text color='gray.700'>{formatedDate}</Text>
    </HStack>
  );
};

export default SingleDate;
