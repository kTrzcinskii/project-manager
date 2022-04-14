export const sortByTypes = [
  'title_asc',
  'title_desc',
  'progressBar_asc',
  'progressBar_desc',
  'deadline_asc',
  'deadline_desc',
  'createdAt_asc',
  'createdAt_desc',
  'status_asc',
  'status_desc',
  'priority_asc',
  'priority_desc',
];

export type sortBy = typeof sortByTypes[number];
