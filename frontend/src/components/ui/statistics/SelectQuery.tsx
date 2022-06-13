import { Dispatch, SetStateAction, useState } from "react";
import Select from "react-select";
import { customTheme } from "../../../utils/selects/selectCustomStyles";
import {
  customStyle,
  timeOption,
  timeOptions,
} from "../../../utils/selects/selectTime";
import { Box } from "@chakra-ui/react";

interface SelectQueryProps {
  setQuery: Dispatch<SetStateAction<string>>;
  setIsCustomInput: Dispatch<SetStateAction<boolean>>;
}

const SelectQuery: React.FC<SelectQueryProps> = ({
  setQuery,
  setIsCustomInput,
}) => {
  const [selectedTime, setSelectedTime] = useState<timeOption | null>(
    timeOptions[1]
  );

  return (
    <Box minW='153px'>
      <Select
        defaultValue={selectedTime}
        onChange={(option) => {
          setSelectedTime(option);
          if (option?.value !== "custom") {
            setIsCustomInput(false);
            const newQuery = "?from=" + option?.value;
            setQuery(newQuery);
          } else {
            setIsCustomInput(true);
          }
        }}
        options={timeOptions}
        theme={customTheme}
        styles={customStyle}
      />
    </Box>
  );
};

export default SelectQuery;
