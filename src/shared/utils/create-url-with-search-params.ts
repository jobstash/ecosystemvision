export const createUrlWithSearchParams = (
  url: string,
  searchParams: string | Record<string, string>,
): string => {
  if (typeof searchParams === 'string') {
    if (!searchParams) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${searchParams}`;
  }

  const urlObject = new URL(url);
  const paramsEntries = Object.entries(searchParams);

  if (paramsEntries.length > 0) {
    paramsEntries.forEach(([key, value]) =>
      urlObject.searchParams.set(key, value),
    );
  }

  return urlObject.toString();
};
