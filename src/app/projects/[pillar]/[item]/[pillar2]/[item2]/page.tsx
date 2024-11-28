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
    pillar2: string;
    item2: string;
  };
}

const Layout = async ({ params }: Props) => {
  const nav = 'projects';
  const pillarInfo = await getPillarInfo({
    nav,
    pillar: params.pillar,
    item: params.item,
  });
  const { title, description } = pillarInfo;

  const { activeItems, altItems } = createPillarItems(nav, pillarInfo, params);
  const inputItems = getInputItems(nav, pillarInfo, params.item, params.item2);

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

      <div className="px-4">
        <PillarItems items={altItems} itemParam={params.item2} />
      </div>
      <p>TODO: Alt Pillar Page Content</p>
    </div>
  );
};
export default Layout;
