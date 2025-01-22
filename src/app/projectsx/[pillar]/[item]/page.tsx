import { AppHeader } from '@/shared/components/app-header';

import { getPillarInfo } from '@/search/data/get-pillar-info';
import { getPillarLabels } from '@/search/data/get-pillar-labels';
import { MainPillarContent } from '@/search/components/main-pillar-content';

import { createLabeledItems } from './create-labeled-items';
import { createPillarRows } from './create-pillar-rows';
import { PillarRow } from './pillar-row';
import { PillarSearch } from './pillar-search';

import { InitSelectedPillarItems } from '@/app/projectsx/[pillar]/[item]/init-selected-pillar-items';

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

  const ssrSelectedItems = labeledItems
    .map(({ label, pillar }) => ({
      label: label!,
      pillar,
    }))
    .filter(({ label }) => !!label);

  // TODO: change projectsx to ${nav}
  const pathPrefix = `/projectsx/${params.pillar}/${params.item}`;

  const mainPillarRow = createPillarRows({
    pathPrefix,
    searchParams,
    labeledItems,
    pillars: [pillarInfo.mainPillar],
  })[0];

  // const altPillarRows = createPillarRows({
  //   pathPrefix,
  //   searchParams,
  //   labeledItems,
  //   pillars: pillarInfo.altPillars,
  // });

  return (
    <div className="relative min-h-screen space-y-4 overflow-hidden">
      <AppHeader
        input={<PillarSearch labeledItems={labeledItems} />}
        searchResults={<p>{'<PillarPageSearchResults />'}</p>}
        mainPillar={
          <MainPillarContent
            title={pillarInfo.title}
            description={pillarInfo.description}
            items={
              <PillarRow
                pillar={params.pillar}
                pillarItems={mainPillarRow.items}
              />
            }
          />
        }
      />

      <InitSelectedPillarItems ssrSelectedItems={ssrSelectedItems} />

      {/* {altPillarRows.map(({ pillar, items }) => (
        <div key={pillar} className="px-4">
          <PillarRow pillar={pillar} pillarItems={items} />
        </div>
      ))} */}

      <p>{'<Content />'}</p>
    </div>
  );
};

export default Page;
