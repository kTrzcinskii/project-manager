import { StylesConfig } from "react-select";
import { priority } from "../../interfaces/IProject";
import { settingsObj } from "./selectCustomStyles";

export interface priorityCreateProjectOption {
  value: priority;
  label: string;
}

export const priorityCreateProjectOptions: priorityCreateProjectOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const customStyle: StylesConfig<priorityCreateProjectOption, false> = {
  ...settingsObj,
};
