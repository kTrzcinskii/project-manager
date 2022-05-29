import { priority } from "./IProject";

export default interface IEditProjectValues {
  title?: string;
  description?: string;
  deadline?: string;
  priority?: priority;
  favorite?: boolean;
}
