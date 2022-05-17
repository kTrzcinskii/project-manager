import { Theme, StylesConfig } from "react-select";
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
    primary25: "#81E6D9",
    neutral0: "#EDF2F7",
  },
});

export const customStyle: StylesConfig<priorityOption, false> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    border: isFocused ? "1px solid #319795" : "1px solid #EDF2F7",
    borderRadius: "0.375rem",

    ":hover": {
      border: isFocused ? "1px solid #319795" : "1px solid #E2E8F0",
      backgroundColor: "#E2E8F0",
    },
  }),
  option: (styles) => {
    return { ...styles };
  },
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    color: isFocused ? "#319795" : "",

    ":hover": {
      color: "#38B2AC",
    },
  }),
};
