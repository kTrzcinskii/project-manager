import { Box, HStack, Stack, VStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import {
  monthOption,
  monthOptions,
  customStyle,
} from "../../../utils/selects/selectMonth";
import { customTheme } from "../../../utils/selects/selectCustomStyles";
import Select from "react-select";
import CustomNumberInput from "./CustomNumberInput";
import { CheckIcon } from "@chakra-ui/icons";

interface DateInputProps {
  field: string;
  setFieldValue: (field: string, value?: string) => void;
  defaultValue?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  setFieldValue,
  field,
  defaultValue,
}) => {
  const values = defaultValue?.split("-");
  // 0 -> year
  // 1 -> month
  // 2 -> day
  let defaultDay: number = 1;
  if (values && values[2]) {
    defaultDay = Number(values[2]);
  }

  let defaultYear: number = 2000;
  if (values && values[0]) {
    defaultYear = Number(values[0]);
  }

  let defaultMonthIndex: number = 0;
  if (values && values[1]) {
    defaultMonthIndex = Number(values[1]) - 1;
  }

  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedMonth, setSelectedMonth] = useState<monthOption | null>(
    monthOptions[defaultMonthIndex]
  );
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const handleClick = () => {
    if (!selectedMonth) {
      throw new Error("Wrong month value");
    }
    const month =
      selectedMonth?.value < 10
        ? `0${selectedMonth?.value}`
        : selectedMonth?.value;

    const day = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
    const dateString = `${selectedYear}-${month}-${day}`;
    setFieldValue(field, dateString);
  };

  return (
    <VStack w='full'>
      <Stack
        w={{ base: "70%", md: "fit-content" }}
        mx='auto'
        direction={{ base: "column", md: "row" }}
      >
        <HStack
          w='full'
          justifyContent='space-between'
          display={{ base: "flex", md: "none" }}
        >
          <Box maxW='80px'>
            <CustomNumberInput
              min={1}
              max={31}
              defaultValue={selectedDay}
              onChange={(value) => {
                setSelectedDay(Number(value));
              }}
            />
          </Box>
          <Box maxW='90px'>
            <CustomNumberInput
              min={2000}
              max={3000}
              defaultValue={selectedYear}
              onChange={(value) => {
                setSelectedYear(Number(value));
              }}
            />
          </Box>
        </HStack>
        <Box maxW='80px' display={{ base: "none", md: "block" }}>
          <CustomNumberInput
            min={1}
            max={31}
            defaultValue={selectedDay}
            onChange={(value) => {
              setSelectedDay(Number(value));
            }}
          />
        </Box>
        <Box minW='138px'>
          <Select
            menuPosition='fixed'
            defaultValue={selectedMonth}
            options={monthOptions}
            theme={customTheme}
            styles={customStyle}
            onChange={(option) => {
              setSelectedMonth(option);
            }}
          />
        </Box>
        <Box maxW='90px' display={{ base: "none", md: "block" }}>
          <CustomNumberInput
            min={2000}
            max={3000}
            defaultValue={selectedYear}
            onChange={(value) => {
              setSelectedYear(Number(value));
            }}
          />
        </Box>
        <IconButton
          aria-label='Accept Date'
          icon={<CheckIcon />}
          onClick={handleClick}
          colorScheme='teal'
          _focus={{ ring: 3, ringColor: "teal.800" }}
        />
      </Stack>
    </VStack>
  );
};

export default DateInput;
