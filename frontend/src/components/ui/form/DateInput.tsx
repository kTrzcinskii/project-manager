import { Box, HStack, Stack, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  monthOption,
  monthOptions,
  customStyle,
} from "../../../utils/selectMonth";
import { customTheme } from "../../../utils/selectCustomStyles";
import Select from "react-select";
import CustomNumberInput from "./CustomNumberInput";

interface DateInputProps {
  field: string;
  setFieldValue: (field: string, value?: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ setFieldValue, field }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<monthOption | null>(
    monthOptions[0]
  );
  const [selectedYear, setSelectedYear] = useState(2000);

  useEffect(() => {
    if (!selectedMonth) {
      return;
    }
    const month =
      selectedMonth?.value < 10
        ? `0${selectedMonth?.value}`
        : selectedMonth?.value;
    const date = new Date(`${selectedYear}-${month}-${selectedDay}`);
    if (!date) {
      return;
    }
    setFieldValue(field, date);
  }, [selectedDay, selectedMonth, selectedYear, field, setFieldValue]);

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
      </Stack>
    </VStack>
  );
};

export default DateInput;
