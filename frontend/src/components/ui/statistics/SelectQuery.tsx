import { Dispatch, SetStateAction, useState } from "react";
import Select, { StylesConfig, Theme } from "react-select";
import { settingsObjWithColor } from "../../../utils/selects/selectCustomStyles";
import { timeOption, timeOptions } from "../../../utils/selects/selectTime";
import { Box } from "@chakra-ui/react";
import getColorsForProjectStats from "../../../utils/getColorsForProjectStats";

interface SelectQueryProps {
  setQuery: Dispatch<SetStateAction<string>>;
  setIsCustomInput: Dispatch<SetStateAction<boolean>>;
  color?: string;
}

const SelectQuery: React.FC<SelectQueryProps> = ({
  setQuery,
  setIsCustomInput,
  color = "teal",
}) => {
  const [selectedTime, setSelectedTime] = useState<timeOption | null>(
    timeOptions[1]
  );

  const colors = getColorsForProjectStats(color);

  const settingsObj = settingsObjWithColor(
    colors.primaryColor,
    colors.secondaryColor
  );
  const customStyle: StylesConfig<timeOption, false> = {
    ...settingsObj,
  };
  const customTheme = (theme: Theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: colors.primaryColor,
      primary25: colors.secondaryColor,
      neutral0: "#EDF2F7",
    },
  });

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
