export const statusTypes = ['backlog', 'inProgress', 'finished'] as const;
export type status = typeof statusTypes[number];
