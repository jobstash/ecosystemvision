export const getTitleCase = (classification: string | null): string =>
    classification
      ?.replaceAll('_', ' ')
      .toLowerCase()
      .replaceAll(/\b\w/g, (s) => s.toUpperCase()) || "";
  