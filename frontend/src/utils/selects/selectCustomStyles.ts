import { Theme } from "react-select";

export const customTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#319795",
    primary25: "#81E6D9",
    neutral0: "#EDF2F7",
  },
});

export const settingsObj = {
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    border: isFocused ? "1px solid #319795" : "1px solid #EDF2F7",
    borderRadius: "0.375rem",

    ":hover": {
      border: isFocused ? "1px solid #319795" : "1px solid #E2E8F0",
      backgroundColor: "#E2E8F0",
    },
  }),
  option: (styles: any) => {
    return { ...styles };
  },
  dropdownIndicator: (base: any, { isFocused }: any) => ({
    ...base,
    color: isFocused ? "#319795" : "",

    ":hover": {
      color: "#38B2AC",
    },
  }),
};

export const settingsObjWithColor = (
  primaryColor = "#319795",
  secondaryColor = "#38B2AC"
) => ({
  control: (styles: any, { isFocused }: any) => ({
    ...styles,
    border: isFocused ? `1px solid ${primaryColor}` : "1px solid #EDF2F7",
    borderRadius: "0.375rem",

    ":hover": {
      border: isFocused ? `1px solid ${primaryColor}` : "1px solid #E2E8F0",
      backgroundColor: "#E2E8F0",
    },
  }),
  option: (styles: any) => {
    return { ...styles };
  },
  dropdownIndicator: (base: any, { isFocused }: any) => ({
    ...base,
    color: isFocused ? `${primaryColor}` : "",

    ":hover": {
      color: `${secondaryColor}`,
    },
  }),
});
