import { VStack, Stack, HStack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import CustomInputDays from "./CustomInputDays";
import DateRangeRadio from "./DateRangeRadio";
import SelectQuery from "./SelectQuery";
import StatsDateInput from "./StatsDateInput";

interface ChooseDateProps {
  isCustomInput: boolean;
  setDateType: Dispatch<SetStateAction<"date-range" | "specific-date">>;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsCustomInput: Dispatch<SetStateAction<boolean>>;
  dateType: "date-range" | "specific-date";
}

const ChooseDate: React.FC<ChooseDateProps> = ({
  isCustomInput,
  setDateType,
  setQuery,
  setIsCustomInput,
  dateType,
}) => {
  return (
    <VStack
      bgColor='white'
      px={5}
      py={4}
      borderWidth={2}
      borderColor='teal'
      rounded='lg'
    >
      <Text
        w='full'
        color='teal.600'
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign='center'
      >
        Select the date you want to check stats from
      </Text>
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        spacing={{ base: 4, md: 6, lg: 12 }}
      >
        <DateRangeRadio
          setDateType={setDateType}
          setQuery={setQuery}
          setIsCustomInput={setIsCustomInput}
        />
        {dateType === "date-range" && (
          <Stack
            justifyContent='center'
            direction={{ base: "column", md: "column", lg: "row" }}
            spacing={{ base: 2, md: 2, lg: 6 }}
          >
            <HStack mx='auto'>
              <Text>From </Text>
              <SelectQuery
                setQuery={setQuery}
                setIsCustomInput={setIsCustomInput}
              />
            </HStack>
            {isCustomInput && <CustomInputDays setQuery={setQuery} />}
          </Stack>
        )}
        {dateType === "specific-date" && <StatsDateInput setQuery={setQuery} />}
      </Stack>
    </VStack>
  );
};

export default ChooseDate;
