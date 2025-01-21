import { AppHeader } from '@/shared/components/app-header';

import { getPillarInfo } from '@/search/data/get-pillar-info';
import { getPillarLabels } from '@/search/data/get-pillar-labels';

import { createLabeledItems } from './create-labeled-items';
import { PillarRows } from './pillar-rows';
import { PillarSearch } from './pillar-search';

interface Props {
  params: Promise<{ pillar: string; item: string }>;
  searchParams: Promise<Record<string, string>>;
}

const Page = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const nav = 'projects';
  const activePillars = [params.pillar, ...Object.keys(searchParams)].join(',');
  const activeSlugs = [params.item, ...Object.values(searchParams)].join(',');

  const [fetchedLabels, pillarInfo] = await Promise.all([
    getPillarLabels({
      nav,
      pillars: activePillars,
      slugs: activeSlugs,
    }),
    getPillarInfo({
      nav,
      pillar: params.pillar,
      item: params.item,
    }),
  ]);

  const labeledItems = createLabeledItems({
    nav,
    params,
    searchParams,
    fetchedLabels,
  });

  const pathPrefix = `/projectsx/${params.pillar}/${params.item}`;

  return (
    <div className="relative min-h-screen space-y-4 overflow-hidden">
      <AppHeader
        input={<PillarSearch labeledItems={labeledItems} />}
        searchResults={<p>{'<PillarPageSearchResults />'}</p>}
        mainPillar={<p>{'<MainPillarContent />'}</p>}
      />

      <PillarRows
        pathPrefix={pathPrefix}
        searchParams={searchParams}
        itemParam={params.item}
        labeledItems={labeledItems}
        pillars={pillarInfo.altPillars}
      />

      <p>{'<Content />'}</p>
    </div>
  );
};

export default Page;
