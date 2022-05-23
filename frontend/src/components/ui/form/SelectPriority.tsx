import { useState } from "react";
import Select from "react-select";
import { customTheme } from "../../../utils/selectCustomStyles";
import {
  customStyle,
  priorityOption,
  priorityOptions,
} from "../../../utils/selectPriority";

interface SelectPriorityProps {
  setFieldValue: (field: string, value?: string) => void;
}

const SelectPriority: React.FC<SelectPriorityProps> = ({ setFieldValue }) => {
  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState<priorityOption | null>(priorityOptions[0]);

  return (
    <Select
      defaultValue={selectedPriorityOption}
      onChange={(option) => {
        setSelectedPriorityOption(option);
        setFieldValue("priority", option?.value);
      }}
      options={priorityOptions}
      theme={customTheme}
      styles={customStyle}
    />
  );
};

export default SelectPriority;
