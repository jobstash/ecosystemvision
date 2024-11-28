import dynamic from 'next/dynamic';

import { createPillarItems } from '@/search/utils/create-pillar-items';
import { getInputItems } from '@/search/utils/get-input-items';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { ActivePillarContent } from '@/search/components/active-pillar-content';
import { PillarItems } from '@/search/components/pillar-items';
import { PillarSearchInput } from '@/search/components/pillar-search-input';

const AppHeader = dynamic(
  () => import('@/shared/components/app-header').then((m) => m.AppHeader),
  {
    ssr: true,
  },
);

interface Props {
  params: {
    pillar: string;
    item: string;
  };
}

const Page = async ({ params }: Props) => {
  const nav = 'projects';
  const pillarInfo = await getPillarInfo({
    nav,
    pillar: params.pillar,
    item: params.item,
  });

  const { altPillar, title, description } = pillarInfo;
  const { activeItems, altItems } = createPillarItems(nav, pillarInfo, params);

  const inputItems = getInputItems(nav, pillarInfo, params.item);

  return (
    <div className="flex flex-col gap-4">
      <AppHeader
        input={<PillarSearchInput inputItems={inputItems} />}
        mainPillar={
          <ActivePillarContent
            title={title}
            description={description}
            items={<PillarItems items={activeItems} itemParam={params.item} />}
          />
        }
      />
      {altPillar && (
        <div className="px-4">
          <PillarItems items={altItems} itemParam="" />
        </div>
      )}
      <p>TODO: Active Pillar Page Content</p>
    </div>
  );
};

export default Page;
