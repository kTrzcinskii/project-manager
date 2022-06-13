import { useState, memo } from "react";
import Select from "react-select";
import { customTheme } from "../../../utils/selects/selectCustomStyles";
import {
  customStyle,
  priorityCreateProjectOption,
  priorityCreateProjectOptions,
} from "../../../utils/selects/selectPriorityCreateProject";

interface SelectPriorityCreateProjectProps {
  setFieldValue: (field: string, value?: string) => void;
}

const SelectPriorityCreateProject: React.FC<
  SelectPriorityCreateProjectProps
> = ({ setFieldValue }) => {
  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState<priorityCreateProjectOption | null>(
      priorityCreateProjectOptions[1]
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
