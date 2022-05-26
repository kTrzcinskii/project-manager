import { priority, status } from "./IProject";

export default interface IHomePageProject {
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  completedAt: Date;
  title: string;
  favorite: boolean;
  id: number;
  priority: priority;
  progressBar: number;
  status: status;
  timeLeft?: string;
}
