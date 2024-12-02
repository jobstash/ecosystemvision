import { AppHeader } from '@/shared/components/app-header';

import { PillarParams } from '@/search/core/types';
import { createPillarItems } from '@/search/utils/create-pillar-items';
import { getInputItems } from '@/search/utils/get-input-items';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { MainPillarContent } from '@/search/components/main-pillar-content';
import { PillarItems } from '@/search/components/pillar-items';
import { PillarSearchInput } from '@/search/components/pillar-search-input';

interface Props {
  params: PillarParams;
}

export const PillarPage = async ({ params }: Props) => {
  const nav = 'projects';
  const pillarInfo = await getPillarInfo({
    nav,
    pillar: params.pillar,
    item: params.item,
    item2: params.item2,
  });

  const { mainPillar, altPillar, title, description } = pillarInfo;
  const { mainItems, altItems } = createPillarItems(nav, pillarInfo, params);
  const inputItems = getInputItems(nav, pillarInfo, params.item, params.item2);

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
                isMain
                pillarSlug={mainPillar.slug}
                items={mainItems}
                itemParam={params.item}
              />
            }
          />
        }
      />
      {altPillar && (
        <div className="px-4">
          <PillarItems
            pillarSlug={altPillar.slug}
            items={altItems}
            itemParam={params.item2 ?? ''}
          />
        </div>
      )}

      <p>TODO: if pillar is not visible, unshift</p>

      <p>TODO: Active Pillar Page Content</p>
    </div>
  );
};
