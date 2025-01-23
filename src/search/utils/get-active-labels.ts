export const getActiveLabels = (
  labeledItems: { label: string | undefined; pillar: string }[],
  pillar: string,
) =>
  labeledItems
    .filter((item) => item.label && item.pillar === pillar)
    .map((item) => item.label) as string[];
