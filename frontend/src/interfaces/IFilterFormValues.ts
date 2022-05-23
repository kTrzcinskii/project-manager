export type priorityType = "all" | "low" | "medium" | "high";

export interface IFilterFormValues {
  favorite?: boolean;
  priority: priorityType;
  title?: string;
  deadlineFrom?: string;
  deadlineTo?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
  completedFrom?: string;
  completedTo?: string;
  progressBarFrom?: number;
  progressBarTo?: number;
}
