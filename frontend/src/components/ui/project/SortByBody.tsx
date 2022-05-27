import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import {
  ImSortAlphaAsc,
  ImSortAlphaDesc,
  ImSortNumericAsc,
  ImSortNumbericDesc,
} from "react-icons/im";

interface SortByBodyProps {
  onClose: () => void;
}

interface field {
  title: string;
  value: string;
  type: "string" | "number";
}

const fields: field[] = [
  { title: "Title", value: "title", type: "string" },
  { title: "Progress", value: "progressBar", type: "number" },
  { title: "Deadline", value: "deadline", type: "number" },
  { title: "Creation Date", value: "createdAt", type: "number" },
  { title: "Status", value: "status", type: "string" },
  { title: "Priority", value: "priority", type: "string" },
];

const SortByBody: React.FC<SortByBodyProps> = ({ onClose }) => {
  return (
    <VStack w='full' spacing={4}>
      {fields.map((field) => {
        return (
          <HStack
            key={field.value}
            w='90%'
            mx='auto'
            justifyContent='space-between'
          >
            <Text fontWeight='semibold'>{field.title}</Text>
            <HStack spacing={3}>
              <IconButton
                size='lg'
                aria-label={`sort by ${field.value}_asc`}
                colorScheme='teal'
                fontSize='2xl'
                icon={
                  field.type === "string" ? (
                    <ImSortAlphaAsc />
                  ) : (
                    <ImSortNumericAsc />
                  )
                }
                _focus={{ ring: 3, ringColor: "teal.800" }}
                w={14}
              />
              <IconButton
                size='lg'
                aria-label={`sort by ${field.value}_desc`}
                colorScheme='blackAlpha'
                fontSize='2xl'
                icon={
                  field.type === "string" ? (
                    <ImSortAlphaDesc />
                  ) : (
                    <ImSortNumbericDesc />
                  )
                }
                _focus={{ ring: 3, ringColor: "gray.800" }}
                w={14}
              />
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default SortByBody;
