export const addMainItemToSearchParams = ({
  pillar,
  item,
  searchParams,
}: {
  pillar: string;
  item: string;
  searchParams: Record<string, string>;
}) => {
  if (!pillar.trim() || !item.trim()) {
    return searchParams;
  }

  return {
    ...searchParams,
    [pillar]: [item, searchParams[pillar]].filter(Boolean).join(','),
  };
};
