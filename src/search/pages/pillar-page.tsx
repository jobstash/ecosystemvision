import { AppHeader } from '@/shared/components/app-header';

import { createLabeledItems } from '@/search/utils/create-labeled-items';
import { createPillarRows } from '@/search/utils/create-pillar-rows';
import { getActiveLabels } from '@/search/utils/get-active-labels';
import { getPillarInfo } from '@/search/data/get-pillar-info';
import { getPillarLabels } from '@/search/data/get-pillar-labels';
import { ActiveSearchHiddenWrapper } from '@/search/components/active-search-hidden-wrapper';
import { MainPillarContent } from '@/search/components/main-pillar-content';
import { PillarAllFilters } from '@/search/components/pillar-all-filters';
import { PillarAllFiltersWrapper } from '@/search/components/pillar-all-filters/wrapper';
import { PillarFilterDropdown } from '@/search/components/pillar-filter-dropdown';
import { PillarFilterDropdownContent } from '@/search/components/pillar-filter-dropdown-content';
import { PillarFilters } from '@/search/components/pillar-filters';
import { PillarLoadingWrapper } from '@/search/components/pillar-loading-wrapper';
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
    pillars: [pillarInfo.altPillars[0]],
    isIndex,
  })[0];

  const altPillarFilters = createPillarRows({
    nav,
    params,
    searchParams,
    labeledItems,
    pillars: pillarInfo.altPillars.slice(1),
  });

  const excluded = [
    ...(params.item ? [params.item] : []),
    ...Object.values(searchParams),
  ].join(',');

  return (
    <PillarAllFiltersWrapper
      allFilters={<PillarAllFilters nav={nav} pillarSelections={altPillarFilters} />}
    >
      <div className="relative min-h-screen space-y-4 overflow-hidden">
        <AppHeader
          input={
            <PillarSearch
              mainLabel={mainPillarRow.items[0].label}
              labeledItems={labeledItems}
            />
          }
          searchResults={<PillarPageSearchResults nav={nav} excluded={excluded} />}
          mainPillar={
            <ActiveSearchHiddenWrapper>
              <MainPillarContent
                title={pillarInfo.title}
                description={pillarInfo.description}
                items={
                  <PillarRow
                    hidePillar
                    nav={nav}
                    pillar={params.pillar}
                    pillarItems={mainPillarRow.items}
                    dropdownContent={
                      <PillarRowDropdownContent
                        nav={nav}
                        pillar={mainPillarRow.pillar}
                        params={params}
                        searchParams={searchParams}
                        activeLabels={getActiveLabels(labeledItems, mainPillarRow.pillar)}
                        isIndex={isIndex}
                      />
                    }
                  />
                }
              />
            </ActiveSearchHiddenWrapper>
          }
        />

        <div className="space-y-4 px-4">
          <ActiveSearchHiddenWrapper>
            <PillarRow
              nav={nav}
              pillar={altPillarRow.pillar}
              pillarItems={altPillarRow.items}
              dropdownContent={
                <PillarRowDropdownContent
                  nav={nav}
                  pillar={altPillarRow.pillar}
                  params={params}
                  searchParams={searchParams}
                  activeLabels={getActiveLabels(labeledItems, altPillarRow.pillar)}
                  isIndex={isIndex}
                />
              }
            />

            <PillarFilters nav={nav}>
              {altPillarFilters.map(({ pillar, items }) => (
                <PillarFilterDropdown key={pillar} pillar={pillar}>
                  <PillarFilterDropdownContent
                    key={pillar}
                    nav={nav}
                    pillar={pillar}
                    params={params}
                    searchParams={searchParams}
                    activeLabels={getActiveLabels(labeledItems, pillar)}
                    isIndex={isIndex}
                    overrideHiddenItems={items.map((item) => item.label)}
                  />
                </PillarFilterDropdown>
              ))}
            </PillarFilters>

            <PillarLoadingWrapper>
              <div className="py-4">{content}</div>
            </PillarLoadingWrapper>
          </ActiveSearchHiddenWrapper>
        </div>
      </div>
    </PillarAllFiltersWrapper>
  );
};
