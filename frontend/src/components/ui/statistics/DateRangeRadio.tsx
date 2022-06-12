import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface DateRangeRadioProps {
  setDateType: Dispatch<SetStateAction<"specific-date" | "date-range">>;
  setQuery: Dispatch<SetStateAction<string>>;
}

const DateRangeRadio: React.FC<DateRangeRadioProps> = ({
  setDateType,
  setQuery,
}) => {
  const [value, setValue] = useState<"specific-date" | "date-range">(
    "date-range"
  );

  return (
    <RadioGroup
      value={value}
      onChange={(value: "specific-date" | "date-range") => {
        setValue(value);
        setDateType(value);
        if (value === "date-range") {
          setQuery("");
        }
      }}
    >
      <Stack w='114px' justifyContent='center' mx='auto'>
        <Radio
          value='date-range'
          colorScheme='teal'
          _focus={{}}
          style={{ touchAction: "none" }}
        >
          Date range
        </Radio>
        <Radio
          value='specific-date'
          colorScheme='teal'
          _focus={{}}
          style={{ touchAction: "none" }}
        >
          Specific date
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default DateRangeRadio;
