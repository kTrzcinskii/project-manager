import { StylesConfig } from "react-select";
import { settingsObj } from "./selectCustomStyles";
import { months } from "./transfromMonthNumberToString";

export interface monthOption {
  value: number;
  label: typeof months[number];
}

const getMonthOptions = () => {
  const arr: monthOption[] = [];
  for (let i = 0; i < months.length; i++) {
    arr.push({ value: i + 1, label: months[i] });
  }
  return arr;
};

export const monthOptions: monthOption[] = getMonthOptions();

export const customStyle: StylesConfig<monthOption, false> = { ...settingsObj };
