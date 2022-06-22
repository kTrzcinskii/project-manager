import { StylesConfig } from "react-select";
import { settingsObjWithColor } from "./selectCustomStyles";

export interface timeOption {
  value: "today" | "week" | "month" | "year" | "custom";
  label: "today" | "last week" | "last month" | "last year" | "custom input";
}

export const timeOptions: timeOption[] = [
  { value: "today", label: "today" },
  { value: "week", label: "last week" },
  { value: "month", label: "last month" },
  { value: "year", label: "last year" },
  { value: "custom", label: "custom input" },
];

const mySettingsObj = settingsObjWithColor();

export const customStyle: StylesConfig<timeOption, false> = {
  ...mySettingsObj,
};
