import { AppHeader } from '@/shared/components/app-header';

import { getPillarInfo } from '@/search/data/get-pillar-info';
import { getPillarLabels } from '@/search/data/get-pillar-labels';
import { MainPillarContent } from '@/search/components/main-pillar-content';

import { ActiveSearchHiddenWrapper } from './active-search-hidden-wrapper';
import { createLabeledItems } from './create-labeled-items';
import { createPillarRows } from './create-pillar-rows';
import { PillarPageSearchResults } from './pillar-page-search-results';
import { PillarRow } from './pillar-row';
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
    nav: 'projectsx',
    params,
    searchParams,
    fetchedLabels,
  });

  const mainPillarRow = createPillarRows({
    nav: 'projectsx',
    params,
    searchParams,
    labeledItems,
    pillars: [pillarInfo.mainPillar],
  })[0];

  const altPillarRow = createPillarRows({
    nav: 'projectsx',
    params,
    searchParams,
    labeledItems,
    pillars: pillarInfo.altPillars,
  })[0];

  // const pillarFilters = createPillarRows({
  //   nav: 'projectsx',
  //   params,
  //   searchParams,
  //   labeledItems,
  //   pillars: pillarInfo.altPillars.slice(1),
  // });

  const excluded = [
    ...(params.item ? [params.item] : []),
    ...Object.values(searchParams),
  ].join(',');

  return (
    <div className="relative min-h-screen space-y-4 overflow-hidden">
      <AppHeader
        input={<PillarSearch labeledItems={labeledItems} />}
        searchResults={
          <PillarPageSearchResults nav={nav} excluded={excluded} />
        }
        mainPillar={
          <ActiveSearchHiddenWrapper>
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
          </ActiveSearchHiddenWrapper>
        }
      />

      <ActiveSearchHiddenWrapper>
        <div className="px-4">
          <PillarRow
            pillar={altPillarRow.pillar}
            pillarItems={altPillarRow.items}
          />
        </div>

        <p>{'<Content />'}</p>
      </ActiveSearchHiddenWrapper>
    </div>
  );
};

export default Page;
