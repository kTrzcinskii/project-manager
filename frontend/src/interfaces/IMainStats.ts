import ISingleProjectStats from "./ISingleProjectStats";

export interface projectsObject {
  lowPriority: number;
  mediumPriority: number;
  highPriority: number;
  all: number;
}

export default interface IMainStats extends ISingleProjectStats {
  allProjectsNumber: projectsObject;
  createdProjectsNumber: projectsObject;
  completedProjectsNumber: projectsObject;
  updatedProjectsNumber: projectsObject;
  allGoalsNumber: number;
}
