export type priorityType = "all" | "low" | "medium" | "high";

export interface IFilterFormValues {
  favorite?: boolean;
  priority: priorityType;
  title?: "string";
  deadlineFrom?: Date;
  deadlineTo?: Date;
  createdFrom?: Date;
  createdTo?: Date;
  updatedFrom?: Date;
  updatedTo?: Date;
  completedFrom?: Date;
  completedTo?: Date;
  progressBarFrom?: number;
  progressBarTo?: number;
}
