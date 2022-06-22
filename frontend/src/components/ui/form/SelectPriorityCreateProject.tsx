import { useState, memo } from "react";
import Select from "react-select";
import { priority } from "../../../interfaces/IProject";
import { customTheme } from "../../../utils/selects/selectCustomStyles";
import {
  customStyle,
  priorityCreateProjectOption,
  priorityCreateProjectOptions,
} from "../../../utils/selects/selectPriorityCreateProject";

interface SelectPriorityCreateProjectProps {
  setFieldValue: (field: string, value?: string) => void;
  defaultValue?: priority;
}

const SelectPriorityCreateProject: React.FC<
  SelectPriorityCreateProjectProps
> = ({ setFieldValue, defaultValue }) => {
  const value = defaultValue || "medium";
  const defaultIndex = priorityCreateProjectOptions
    .map((option) => option.value)
    .indexOf(value);

  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState<priorityCreateProjectOption | null>(
      priorityCreateProjectOptions[defaultIndex]
    );

  return (
    <Select
      defaultValue={selectedPriorityOption}
      onChange={(option) => {
        setSelectedPriorityOption(option);
        setFieldValue("priority", option?.value);
      }}
      options={priorityCreateProjectOptions}
      theme={customTheme}
      styles={customStyle}
      instanceId='select-priority-create-project-form'
    />
  );
};

export default memo(SelectPriorityCreateProject);
