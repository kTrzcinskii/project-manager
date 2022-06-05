import { useState, memo } from "react";
import Select from "react-select";
import { priorityType } from "../../../interfaces/IFilterFormValues";
import { customTheme } from "../../../utils/selectCustomStyles";
import {
  customStyle,
  priorityOption,
  priorityOptions,
} from "../../../utils/selectPriority";

interface SelectPriorityProps {
  setFieldValue: (field: string, value?: string) => void;
  defaultValue: priorityType | undefined;
}

const SelectPriority: React.FC<SelectPriorityProps> = ({
  setFieldValue,
  defaultValue,
}) => {
  let defaultValueIndex = 0;

  if (defaultValue) {
    const priorityOptionsMapped = priorityOptions.map((option) => option.value);
    defaultValueIndex = priorityOptionsMapped.indexOf(defaultValue);
  }

  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState<priorityOption | null>(priorityOptions[defaultValueIndex]);

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

export default memo(SelectPriority);
