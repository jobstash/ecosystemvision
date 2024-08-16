export const conditionalItem = <T>(includeItem: boolean, item: T) =>
  includeItem ? [item] : [];
