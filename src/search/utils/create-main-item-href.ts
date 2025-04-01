export const createMainItemHref = (
  nav: string,
  params: { pillar: string; item: string },
  searchParamsWithMainItem: Record<string, string>,
) => {
  const defaultHref = `/${nav}`;

  const hasNoSearchParams = Object.keys(searchParamsWithMainItem).length === 0;
  if (hasNoSearchParams) return defaultHref;

  const nextPillarEntry = Object.entries(searchParamsWithMainItem).find(
    ([pillar]) => !pillar.includes('order'),
  );

  if (!nextPillarEntry) return defaultHref;

  const [nextPillar, nextPillarValue] = nextPillarEntry;

  const nextItem = nextPillarValue.split(',').find((v) => v !== params.item);
  if (!nextItem) return defaultHref;

  const searchParamsObj = new URLSearchParams();
  for (const [p, v] of Object.entries(searchParamsWithMainItem)) {
    if (p === nextPillar) {
      const values = v
        .split(',')
        .filter((val) => val !== nextItem && val !== params.item);

      if (values.length > 0) {
        searchParamsObj.set(p, values.join(','));
      }
    } else {
      searchParamsObj.set(p, v);
    }
  }

  const searchString = searchParamsObj.toString();
  return `/${nav}/${nextPillar}/${nextItem}${
    searchString ? `?${searchString}` : ''
  }`;
};
