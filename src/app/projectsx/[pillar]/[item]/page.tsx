import { AppHeader } from '@/shared/components/app-header';

import { getPillarLabels } from '@/search/data/get-pillar-labels';

import { createLabeledItems } from './create-labeled-items';
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

  const fetchedLabels = await getPillarLabels({
    nav,
    pillars: activePillars,
    slugs: activeSlugs,
  });

  const labeledItems = createLabeledItems({
    nav,
    params,
    searchParams,
    fetchedLabels,
  });

  return (
    <div className="relative min-h-screen space-y-4 overflow-hidden">
      <AppHeader
        input={<PillarSearch labeledItems={labeledItems} />}
        searchResults={<p>{'<PillarPageSearchResults />'}</p>}
        mainPillar={<p>{'<MainPillarContent />'}</p>}
      />
      <p>{'<PillarRows />'}</p>
      <p>{'<Content />'}</p>

      <pre>{JSON.stringify({ fetchedLabels }, undefined, '\t')}</pre>
    </div>
  );
};

export default Page;
