import ICreateGoalValues from "./ICreateGoalValues";
import { priority } from "./IProject";

export default interface ICreateProjectValues {
  title: string;
  description: string;
  goals: ICreateGoalValues[];
  deadline: string;
  priority: priority;
  favorite?: boolean;
}
