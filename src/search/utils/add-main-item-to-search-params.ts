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
    [pillar]: [searchParams[pillar], item].filter(Boolean).join(','),
  };
};
