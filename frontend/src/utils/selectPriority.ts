import { StylesConfig } from "react-select";
import { priorityType } from "../interfaces/IFilterFormValues";
import { settingsObj } from "./selectCustomStyles";

export interface priorityOption {
  value: priorityType;
  label: string;
}

export const priorityOptions: priorityOption[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const customStyle: StylesConfig<priorityOption, false> = {
  ...settingsObj,
};
