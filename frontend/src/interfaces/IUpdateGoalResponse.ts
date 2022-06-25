import { status } from "./IProject";

export default interface IUpdateGoalResponse {
  status: status;
  progressBar: number;
}
