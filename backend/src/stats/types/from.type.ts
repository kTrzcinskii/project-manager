export const fromTypes = ['today', 'week', 'month', 'year'] as const;

export type from = typeof fromTypes[number];
