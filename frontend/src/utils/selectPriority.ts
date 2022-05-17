import { Theme } from "react-select";
import { priorityType } from "../interfaces/IFilterFormValues";

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

export const customTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#319795",
    primary25: "#E6FFFA",
  },
});
