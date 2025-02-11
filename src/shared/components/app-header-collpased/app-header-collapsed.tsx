import React from 'react';

import { FullPageWrapper } from '@/shared/components/app-header/full-page-wrapper';
import { SearchDetailsButton } from '@/shared/components/app-header/search-details-button';
import { Brand } from '@/shared/components/brand';
import { MenuButton } from '@/shared/components/menu-button';

import { AppHeaderProvider } from './context';
import { HeaderLinks } from './header-links';
import { MainInput } from './main-input';
interface Props {
  input?: React.ReactNode;
  mainPillar?: React.ReactNode;
  searchResults?: React.ReactNode;
  showSearchButton?: boolean;
}

export const AppHeader = (props: Props) => {
  const { input, mainPillar, searchResults, showSearchButton } = props;
  return (
    <AppHeaderProvider>
        <FullPageWrapper>
          <div className="flex min-h-16 flex-wrap items-center gap-8">
            <div className="order-1 shrink-0 lg:hidden">
              <Brand />
            </div>

            <div className="order-3 w-full grow lg:order-2 lg:w-auto">
              <MainInput mainInput={input} />
            </div>

            <div className="order-2 flex grow justify-end gap-4 lg:grow-0">
              {showSearchButton && <SearchDetailsButton />}
              <HeaderLinks />
              <MenuButton />
            </div>
          </div>

          {searchResults}

          {mainPillar}
        </FullPageWrapper>
    </AppHeaderProvider>
  );
};
