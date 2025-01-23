export const createPillarItemSearchParams = (
  params: { pillar: string; item: string },
  searchParams: Record<string, string>,
) => {
  const { include, ...restSearchParams } = searchParams;
  if (!params.pillar) return '';

  const pillarValue = include ? `${params.item},${include}` : params.item;
  return pillarValue
    ? { [params.pillar]: pillarValue, ...restSearchParams }
    : '';
};
