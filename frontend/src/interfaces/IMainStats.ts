import ISingleProjectStats from "./ISingleProjectStats";

export default interface IMainStats extends ISingleProjectStats {
  allProjectsNumber: number;
  createdProjectsNumber: number;
  completedProjectsNumber: number;
  updatedProjectsNumber: number;
  allGoalsNumber: number;
}
