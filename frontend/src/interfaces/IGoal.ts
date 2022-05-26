export default interface IGoal {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date;
  completed: boolean;
  content: string;
  projectId: number;
}
