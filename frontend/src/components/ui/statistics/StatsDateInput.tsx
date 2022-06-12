import { CheckIcon } from "@chakra-ui/icons";
import {
  VStack,
  Stack,
  HStack,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { customTheme } from "../../../utils/selectCustomStyles";
import {
  customStyle,
  monthOption,
  monthOptions,
} from "../../../utils/selectMonth";
import CustomNumberInput from "../form/CustomNumberInput";
import Select from "react-select";
import newSpecificDateToastOptions from "../../../utils/toasts/newSpecificDateToastOptions";

interface StatsDateInputProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

const StatsDateInput: React.FC<StatsDateInputProps> = ({ setQuery }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<monthOption | null>(
    monthOptions[0]
  );
  const [selectedYear, setSelectedYear] = useState(2022);

  const toast = useToast();

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
    setQuery(`?date=${dateString}`);
    const toastOptions = newSpecificDateToastOptions(dateString);
    toast(toastOptions);
  };

  return (
    <VStack minW='350px' justifyContent='center'>
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

export default StatsDateInput;