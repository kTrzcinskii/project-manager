export interface ProjectsWithTimeLeft {
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  title: string;
  favorite: boolean;
  id: number;
  priority: 'low' | 'medium' | 'high';
  progressBar: number;
  status: 'backlog' | 'inProgress' | 'finished';
  timeLeft?: string;
}
