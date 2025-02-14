export const addMainItemToSearchParams = ({
  pillar,
  item,
  searchParams,
}: {
  pillar: string;
  item: string;
  searchParams: Record<string, string>;
}) => {
  return {
    ...searchParams,
    [pillar]: [item, searchParams[pillar]].filter(Boolean).join(','),
  };
};
