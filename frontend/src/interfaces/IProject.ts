import IGoal from "./IGoal";

export default interface IProject {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
  title: string;
  description: string;
  goals: IGoal[];
  deadline: Date;
  status: status;
  priority: priority;
  progressBar: number;
  favorite: boolean;
  userId: number;
}

export type status = "backlog" | "inProgress" | "finished";

export type priority = "low" | "medium" | "high";
