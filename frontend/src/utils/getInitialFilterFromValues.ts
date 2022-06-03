import {
  IFilterFormValues,
  priorityType,
} from "../interfaces/IFilterFormValues";

const getInitialFilterFormValues = (query: string): IFilterFormValues => {
  const priorityRegexp = new RegExp("priority=[^&]+", "igm");
  let priority: priorityType = "all";

  const priorityString = query.match(priorityRegexp);
  if (priorityString?.length != 0 && priorityString) {
    //@ts-ignore
    priority = priorityString[0].split("=")[1];
  }

  const obj: IFilterFormValues = { priority };

  const globalRegexp = new RegExp("&\\w+=[^&]+", "igm");

  const fields = query.match(globalRegexp);

  if (!fields) {
    return obj;
  }

  const acctualFields: string[] = [];

  for (const field of fields) {
    if (
      field.includes("srt") ||
      field.includes("priority") ||
      fields.includes("page")
    ) {
      continue;
    }
    acctualFields.push(field);
  }

  if (!acctualFields) {
    return obj;
  }

  for (const field of acctualFields) {
    const key = field.split("=")[0].slice(1);
    const value = field.split("=")[1];
    //@ts-ignore
    obj[key] = value;
  }

  return obj;
};

export default getInitialFilterFormValues;
