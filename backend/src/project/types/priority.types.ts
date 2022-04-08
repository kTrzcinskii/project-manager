export const priorityTypes = ['low', 'medium', 'high'] as const;
export type priority = typeof priorityTypes[number];
