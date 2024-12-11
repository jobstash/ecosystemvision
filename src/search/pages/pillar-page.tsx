import { notFound } from 'next/navigation';

import { errMsg } from '@/shared/core/errors';
import { normalizeString } from '@/shared/utils/normalize-string';
import { AppHeader } from '@/shared/components/app-header';

import { PillarParams, PillarSearchParams } from '@/search/core/types';
import { createInputItems } from '@/search/utils/create-input-items';
import { createPillarItems } from '@/search/utils/create-pillar-items';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { MainPillarContent } from '@/search/components/main-pillar-content';
import { PillarItems } from '@/search/components/pillar-items';
import { PillarItemsDropdownContent } from '@/search/components/pillar-items-dropdown-content';
import { PillarSearchInput } from '@/search/components/pillar-search-input';

interface Props {
  nav: string;
  params: PillarParams;
  searchParams: PillarSearchParams;
}

export const PillarPage = async ({ nav, params, searchParams }: Props) => {
  const pillarInfo = await getPillarInfo({
    nav,
    pillar: params.pillar,
    item: params.item,
    // TODO: searchParams implementation for mw endpoint
  });

  const { title, description } = pillarInfo;

  try {
    moveItemToFront(pillarInfo.mainPillar.items, params.item);
  } catch (error) {
    if ((error as Error).message === errMsg.NOT_FOUND) {
      notFound();
    }
  }

  const { mainItems, altItems, activeItems } = createPillarItems({
    nav,
    pillarInfo,
    params,
    searchParams,
  });

  const inputItems = createInputItems(activeItems, params.item);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader
        input={<PillarSearchInput inputItems={inputItems} />}
        mainPillar={
          <MainPillarContent
            title={title}
            description={description}
            items={
              <PillarItems
                params={params}
                items={mainItems}
                pillarSlug={params.pillar}
                dropdownContent={
                  <PillarItemsDropdownContent
                    nav={nav}
                    pillarInfo={pillarInfo}
                    params={params}
                    searchParams={searchParams}
                    pillarSlug={params.pillar}
                    activeItems={activeItems.include}
                  />
                }
              />
            }
          />
        }
      />

      {pillarInfo.altPillars.map(({ slug }) => {
        const items = altItems[slug] || undefined;
        if (!items || items?.length === 0) return null;

        return (
          <div key={slug} className="px-4">
            <PillarItems
              params={params}
              items={items}
              pillarSlug={slug}
              dropdownContent={
                <PillarItemsDropdownContent
                  nav={nav}
                  pillarInfo={pillarInfo}
                  params={params}
                  searchParams={searchParams}
                  pillarSlug={slug}
                  activeItems={activeItems[slug] || []}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
};

const moveItemToFront = (items: string[], itemParam: string) => {
  const index = items.findIndex((item) => normalizeString(item) === itemParam);
  if (index === -1) throw new Error(errMsg.NOT_FOUND);

  items.unshift(items.splice(index, 1)[0]);
  return false;
};
