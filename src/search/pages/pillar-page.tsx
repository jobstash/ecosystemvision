import { AppHeader } from '@/shared/components/app-header';

import { createLabeledItems } from '@/search/utils/create-labeled-items';
import { createPillarRows } from '@/search/utils/create-pillar-rows';
import { getActiveLabels } from '@/search/utils/get-active-labels';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { getPillarLabels } from '@/search/data/get-pillar-labels';
import { ActiveSearchHiddenWrapper } from '@/search/components/active-search-hidden-wrapper';
import { MainPillarContent } from '@/search/components/main-pillar-content';
import { PillarPageSearchResults } from '@/search/components/pillar-page-search-results';
import { PillarRow } from '@/search/components/pillar-row';
import { PillarRowDropdownContent } from '@/search/components/pillar-row-dropdown-content';
import { PillarSearch } from '@/search/components/pillar-search';

interface Props {
  nav: string;
  params: { pillar: string; item: string };
  searchParams: Record<string, string>;
  content: React.ReactNode;
  isIndex?: boolean;
}

export const PillarPage = async (props: Props) => {
  const { nav, params, searchParams, content, isIndex = false } = props;

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

  const mainPillarRow = createPillarRows({
    nav,
    params,
    searchParams,
    labeledItems,
    pillars: [pillarInfo.mainPillar],
    isIndex,
  })[0];

  const altPillarRow = createPillarRows({
    nav,
    params,
    searchParams,
    labeledItems,
    pillars: pillarInfo.altPillars,
    isIndex,
  })[0];

  // const pillarFilters = createPillarRows({
  //   nav,
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
        input={
          <PillarSearch
            mainLabel={mainPillarRow.items[0].label}
            labeledItems={labeledItems}
          />
        }
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
                  hidePillar
                  pillar={params.pillar}
                  pillarItems={mainPillarRow.items}
                  dropdownContent={
                    <PillarRowDropdownContent
                      nav={nav}
                      pillar={mainPillarRow.pillar}
                      params={params}
                      searchParams={searchParams}
                      activeLabels={getActiveLabels(
                        labeledItems,
                        mainPillarRow.pillar,
                      )}
                      isIndex={isIndex}
                    />
                  }
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
            dropdownContent={
              <PillarRowDropdownContent
                nav={nav}
                pillar={altPillarRow.pillar}
                params={params}
                searchParams={searchParams}
                activeLabels={getActiveLabels(
                  labeledItems,
                  altPillarRow.pillar,
                )}
                isIndex={isIndex}
              />
            }
          />
        </div>

        {content}
      </ActiveSearchHiddenWrapper>
    </div>
  );
};
