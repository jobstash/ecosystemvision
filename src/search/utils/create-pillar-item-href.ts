import { FRONTEND_URL } from '@/shared/core/envs';

import { TPillarInfo } from '@/search/core/schemas';
import { PillarParams, PillarSearchParams } from '@/search/core/types';

interface Props {
  nav: string;
  pillarInfo: TPillarInfo;
  params: PillarParams;
  searchParams: PillarSearchParams;
}

export const createPillarItemHref = (
  props: Props,
  newSearchParams?: PillarSearchParams,
  overrideUrl?: { pillar: string; item: string },
) => {
  const { nav, params, searchParams } = props;

  if (overrideUrl) {
    return `${FRONTEND_URL}/${nav}/${overrideUrl.pillar.toLowerCase()}/${overrideUrl.item.toLowerCase()}`;
  }

  const baseUrl = `${FRONTEND_URL}/${nav}/${params.pillar}/${params.item}`;

  if (!newSearchParams && !searchParams) {
    return baseUrl;
  }

  const urlSearchParams = new URLSearchParams(newSearchParams || searchParams);

  const searchPairs = Array.from(urlSearchParams.entries()).map(
    ([key, value]) => `${key}=${value}`,
  );

  const searchString = searchPairs.join('&');

  return searchString ? `${baseUrl}?${searchString}` : baseUrl;
};
