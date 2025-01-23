interface Options {
  isActive: boolean;
  pathPrefix: string;
  searchParams: Record<string, string>;
  pillar: string;
  slug: string;
}

export const createPillarItemHref = (options: Options) => {
  const { isActive, pathPrefix, searchParams, pillar, slug } = options;
  const newSearchParams = new URLSearchParams(searchParams);
  const currentItems = newSearchParams.get(pillar)?.split(',') ?? [];

  const updatedItems = isActive
    ? currentItems.filter((item) => item !== slug)
    : [...currentItems, slug];

  const shouldRemoveParam = updatedItems.length === 0;
  shouldRemoveParam
    ? newSearchParams.delete(pillar)
    : newSearchParams.set(pillar, updatedItems.join(','));

  const searchParamsString = newSearchParams.toString();

  if (searchParamsString === '') return pathPrefix;
  return `${pathPrefix}?${searchParamsString}`;
};
